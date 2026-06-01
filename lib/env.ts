import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY est requis"),
  CONTACT_TO_EMAIL: z.email("CONTACT_TO_EMAIL doit être un email valide"),
});

const parsed = envSchema.safeParse({
  RESEND_API_KEY: process.env["RESEND_API_KEY"],
  CONTACT_TO_EMAIL: process.env["CONTACT_TO_EMAIL"],
});

if (!parsed.success) {
  // Échec explicite côté serveur, jamais exposé au client.
  console.error("Variables d'environnement invalides :", z.flattenError(parsed.error).fieldErrors);
  throw new Error("Configuration d'environnement invalide.");
}

export const env = parsed.data;
