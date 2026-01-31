import { useState } from "react";
import { loginSchema } from "@/lib/validations/login.schema";
import { LoginService } from "@/services/login.service";

export const useLogin = () => {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        setErrors({ general: String((error as { message: string }).message) });
      } else {
        setErrors({ general: "Error inesperado al iniciar sesión" });
      }
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
