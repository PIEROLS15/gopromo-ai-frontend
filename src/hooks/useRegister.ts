import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { RegisterService } from "@/services/register.service";
import {
  providerRegisterSchema,
  publicRegisterSchema,
  type ProviderRegisterSchema,
  type PublicRegisterSchema,
} from "@/lib/validations/register.schema";
import { PublicRegisterPayload, ProviderRegisterPayload } from "@/types/register";
import { getErrorMessage } from "@/lib/validations/formUtils";

const getFirstErrorMessage = (errors: FieldErrors) => {
  const firstError = Object.values(errors)[0];
  if (!firstError) return null;
  if ("message" in firstError && typeof firstError.message === "string") {
    return firstError.message;
  }
  return null;
};

export const useRegister = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [providerLoading, setProviderLoading] = useState(false);
  const [publicLoading, setPublicLoading] = useState(false);
  const [providerApiError, setProviderApiError] = useState<string | null>(null);
  const [publicApiError, setPublicApiError] = useState<string | null>(null);

  const providerForm = useForm<ProviderRegisterSchema>({
    resolver: zodResolver(providerRegisterSchema),
    defaultValues: {
      representativeName: "",
      companyName: "",
      ruc: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const publicForm = useForm<PublicRegisterSchema>({
    resolver: zodResolver(publicRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      institution: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
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

  const handleProviderSubmit = providerForm.handleSubmit(
    async (data) => {
      setProviderApiError(null);
      try {
        setProviderLoading(true);
        const response = await registerProvider({
          email: data.email,
          ruc: data.ruc,
          representativeName: data.representativeName,
          companyName: data.companyName,
          phone: data.phone,
          password: data.password,
        });

        toast({
          title: "¡Éxito!",
          description: response.message,
          variant: "success",
        });

        router.push("/");
      } catch (error) {
        const errorMessage = getErrorMessage(
          error,
          "Error al registrar proveedor"
        );
        setProviderApiError(errorMessage);
        toast({
          title: errorMessage,
          variant: "destructive",
        });
      } finally {
        setProviderLoading(false);
      }
    },
    (errors) => {
      const message = getFirstErrorMessage(errors);
      if (message) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
    }
  );

  const handlePublicSubmit = publicForm.handleSubmit(
    async (data) => {
      setPublicApiError(null);
      try {
        setPublicLoading(true);
        const response = await registerPublic({
          email: data.email,
          fullName: data.fullName,
          educationalInstitution: data.institution || null,
          phone: data.phone || null,
          password: data.password,
        });

        toast({
          title: "¡Éxito!",
          description: response.message,
          variant: "success",
        });

        router.push("/");
      } catch (error) {
        const errorMessage = getErrorMessage(error, "Error al registrar");
        setPublicApiError(errorMessage);
        toast({
          title: errorMessage,
          variant: "destructive",
        });
      } finally {
        setPublicLoading(false);
      }
    },
    (errors) => {
      const message = getFirstErrorMessage(errors);
      if (message) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
    }
  );

  return {
    registerPublic,
    registerProvider,
    provider: {
      handleSubmit: handleProviderSubmit,
      register: providerForm.register,
      control: providerForm.control,
      errors: providerForm.formState.errors,
      isSubmitting: providerForm.formState.isSubmitting,
      loading: providerLoading,
      apiError: providerApiError,
      watch: providerForm.watch,
    },
    public: {
      handleSubmit: handlePublicSubmit,
      register: publicForm.register,
      control: publicForm.control,
      errors: publicForm.formState.errors,
      isSubmitting: publicForm.formState.isSubmitting,
      loading: publicLoading,
      apiError: publicApiError,
      watch: publicForm.watch,
    },
  };
};
