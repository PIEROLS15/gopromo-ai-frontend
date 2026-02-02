import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/validations/login.schema";
import { LoginService } from "@/services/login.service";

interface ApiError {
  message?: string;
}

export const useLogin = (rememberMe: boolean) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0];
        if (field) {
          fieldErrors[field as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setLoading(true);
      await LoginService.login(form);
      toast({
        title: "¡Éxito!",
        description: "Inicio de sesión exitoso",
        variant: "success",
      });
      router.push("/");
    } catch (error: unknown) {
      let message = "Error inesperado al iniciar sesión";
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        message = String((error as { message: string }).message);
      }
      toast({
        title: "¡Error!",
        description: message,
        variant: "destructive",
      });
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };
  return {
    form,
    setForm,
    errors,
    loading,
    handleSubmit,
  };
};
