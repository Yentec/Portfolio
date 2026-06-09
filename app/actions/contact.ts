"use server";

import { z } from "zod";
import { Resend } from "resend";
import { getLocale, getTranslations } from "next-intl/server";
import { env } from "@/lib/env";
import { profile } from "@/content/profile";
import { renderContactEmail } from "@/components/email/ContactEmail";
import { contactSchema } from "@/lib/contact-schema";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

const resend = new Resend(env.RESEND_API_KEY);

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "contact.form.errors" });

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const rawErrors = z.flattenError(parsed.error).fieldErrors;
    const localizedErrors = Object.fromEntries(
      Object.entries(rawErrors).map(([field, messages]) => [
        field,
        messages?.map((key) => {
          try {
            return t(key as Parameters<typeof t>[0]);
          } catch {
            return key;
          }
        }) ?? [],
      ]),
    );
    return {
      status: "error",
      message: t("formGeneral"),
      fieldErrors: localizedErrors,
    };
  }

  // Honeypot rempli → on simule un succès sans rien envoyer.
  if (parsed.data.company) {
    return { status: "success" };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const html = renderContactEmail({ name, email, subject, message, portfolioName: profile.name });

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: subject
        ? `${subject} — ${name} via ${profile.name}`
        : `Message from ${name} — ${profile.name}`,
      html,
    });

    if (error) {
      return { status: "error", message: t("sendFailed") };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: t("serverError") };
  }
}
