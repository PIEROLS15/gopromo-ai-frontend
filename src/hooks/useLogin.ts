import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  loginSchema,
  type LoginSchema,
} from "@/lib/validations/login.schema";
import { getErrorMessage } from "@/lib/validations/formUtils";
import { LoginService } from "@/services/login.service";

export const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setApiError(null);
    try {
      setLoading(true);
      const response = await LoginService.login(data);
      toast({
        title: "¡Éxito!",
        description: response.message,
        variant: "success",
      });
      router.push("/");
    } catch (error: unknown) {
      const message = getErrorMessage(
        error,
        "Error inesperado al iniciar sesión"
      );
      setApiError(message);
      toast({
        title: "¡Error!",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    handleSubmit,
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    loading,
    apiError,
  };
};
