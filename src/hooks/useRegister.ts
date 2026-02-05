import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ZodTypeAny } from "zod";
import { useToast } from "@/hooks/use-toast";
import { RegisterService } from "@/services/register.service";
import {
  providerRegisterSchema,
  publicRegisterSchema,
} from "@/lib/validations/register.schema";
import {
  PublicRegisterPayload,
  ProviderRegisterPayload,
} from "@/types/register";

export const useRegister = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [providerForm, setProviderForm] = useState({
    representativeName: "",
    companyName: "",
    ruc: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    return fallback;
  };

  const validateForm = <TData,>(schema: ZodTypeAny, data: TData) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast({
        title: "Error",
        description: parsed.error.issues[0]?.message ?? "Formulario inválido",
        variant: "destructive",
      });
      return null;
    }
    return parsed.data as TData;
  };
  const [publicForm, setPublicForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const registerPublic = async (
    data: Omit<PublicRegisterPayload, "roleId">
  ) => {
    const res = await RegisterService.registerPublic(data);
    return res;
  };

  const registerProvider = async (
    data: Omit<ProviderRegisterPayload, "roleId">
  ) => {
    const res = await RegisterService.registerProvider(data);
    return res;
  };

  const handleProviderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = validateForm(providerRegisterSchema, providerForm);
    if (!parsed) return;

    try {
      const response = await registerProvider({
        email: parsed.email,
        ruc: parsed.ruc,
        representativeName: parsed.representativeName,
        companyName: parsed.companyName,
        phone: parsed.phone,
        password: parsed.password,
      });

      toast({
        title: response.message,
      });

      router.push("/");
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Error al registrar proveedor"
      );

      toast({
        title: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handlePublicSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = validateForm(publicRegisterSchema, publicForm);
    if (!parsed) return;

    try {
      const response = await registerPublic({
        email: parsed.email,
        fullName: parsed.fullName,
        educationalInstitution: publicForm.institution || null,
        phone: parsed.phone || null,
        password: parsed.password,
      });

      toast({
        title: response.message,
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: getErrorMessage(error, "Error al registrar"),
        variant: "destructive",
      });
    }
  };

  return {
    registerPublic,
    registerProvider,
    publicForm,
    setPublicForm,
    handlePublicSubmit,
    providerForm,
    setProviderForm,
    handleProviderSubmit,
  };
};
