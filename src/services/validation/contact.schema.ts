import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Ingresa tu nombre completo"),
  email: z.email("Correo inválido"),
  phone: z.string().min(6, "Ingresa un teléfono válido"),
  subject: z.string().min(3, "Ingresa un asunto"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
