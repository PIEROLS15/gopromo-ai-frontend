import { z } from "zod";

const email = z.string().email("Email inválido");
const password = z.string().min(8, "Mínimo 8 caracteres");
const phone = z.string().min(6, "Teléfono inválido");
const ruc = z.string().length(11, "RUC inválido");

export const publicRegisterSchema = z
  .object({
    fullName: z.string().min(2, "Nombre requerido"),
    email,
    institution: z.string().optional(),
    phone,
    password,
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine((value) => value === true, "Debes aceptar los términos"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export const providerRegisterSchema = z
  .object({
    representativeName: z.string().min(2, "Nombre requerido"),
    companyName: z.string().min(2, "Nombre requerido"),
    ruc,
    email,
    phone,
    password,
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine((value) => value === true, "Debes aceptar los términos"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type PublicRegisterSchema = z.infer<typeof publicRegisterSchema>;
export type ProviderRegisterSchema = z.infer<typeof providerRegisterSchema>;
