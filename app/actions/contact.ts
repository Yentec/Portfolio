"use server";

import { z } from "zod";
import { Resend } from "resend";
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
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Merci de corriger les champs indiqués.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
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
        : `Nouveau message de ${name} — ${profile.name}`,
      html,
    });

    if (error) {
      return { status: "error", message: "L'envoi a échoué. Réessaie plus tard." };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: "Une erreur est survenue. Réessaie plus tard." };
  }
}
