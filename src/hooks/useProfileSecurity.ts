"use client";
import { useState } from "react";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function useProfileSecurity() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden", variant: "destructive" });
      return;
    }
    try {
      await UserService.changePassword({ password: newPassword });
      toast({ title: "Éxito", description: "Contraseña actualizada. Inicia sesión de nuevo", variant: "success" });
      await AuthService.logout();
      router.push("/login");
    } catch (err: unknown) {
      let status: number | undefined;
      if (typeof err === 'object' && err !== null) {
        status = (err as { status?: number }).status;
      }
      let backendMsg = "No se pudo actualizar la contraseña";
      if (typeof err === 'object' && err !== null) {
        backendMsg = (err as { message?: string }).message ?? backendMsg;
      }
      if (status === 404) {
        toast({
          title: "Error",
          description: "No se pudo actualizar la contraseña en este momento. Intenta nuevamente más tarde.",
          variant: "destructive"
        });
      } else {
        toast({ title: "Error", description: backendMsg, variant: "destructive" });
      }
    }
  };

  return {
    showPassword,
    setShowPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  };
}
