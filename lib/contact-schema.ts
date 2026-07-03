import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameMin").max(80),
  email: z.email("emailInvalid"),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "messageMin").max(2000),
  company: z.string().max(0).optional().or(z.literal("")),
});
