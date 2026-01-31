import { z } from "zod";

const email = z.string().email("Email inválido");
const password = z.string().min(8, "Mínimo 8 caracteres");
const phone = z.string().min(6, "Teléfono inválido");
const ruc = z.string().length(11, "RUC inválido");

export const publicRegisterSchema = z
  .object({
    fullName: z.string().min(2, "Nombre requerido"),
    email,
    phone,
    password,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export const providerRegisterSchema = z
  .object({
    representativeName: z.string().min(2),
    companyName: z.string().min(2),
    ruc,
    email,
    phone,
    password,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });