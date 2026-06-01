"use server";

import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { profile } from "@/content/profile";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court.").max(80),
  email: z.string().trim().email("Email invalide."),
  message: z.string().trim().min(10, "Message trop court.").max(2000),
  // Honeypot : champ caché qui doit rester vide (les bots le remplissent).
  company: z.string().max(0).optional().or(z.literal("")),
});

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
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Merci de corriger les champs indiqués.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot rempli → on simule un succès sans rien envoyer.
  if (parsed.data.company) {
    return { status: "success" };
  }

  const { name, email, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nouveau message de ${name} — ${profile.name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      return { status: "error", message: "L'envoi a échoué. Réessaie plus tard." };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: "Une erreur est survenue. Réessaie plus tard." };
  }
}
