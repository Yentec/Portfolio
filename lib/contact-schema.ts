import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court.").max(80),
  email: z.email("Email invalide."),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Message trop court.").max(2000),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
