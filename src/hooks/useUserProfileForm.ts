"use client";
import { useSession } from "@/context/sessionContext";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/user.service";
import { useState } from "react";
import type { UserInitial, UpdateMePayload } from "@/types/login";

export function useUserProfileForm(initialData?: UserInitial) {
  const { refreshSession, user } = useSession();
  const { toast } = useToast();
  type UserRecord = { fullName?: string; email?: string; phone?: string; educationalInstitution?: string };
  const currentUser = (user as unknown) as UserRecord | null;
  const [apiError, setApiError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>(initialData?.fullName ?? (currentUser?.fullName ?? ""));
  const [phone, setPhone] = useState<string>(initialData?.phone ?? (currentUser?.phone ?? ""));
  const [education, setEducation] = useState<string>(initialData?.educationalInstitution ?? (currentUser?.educationalInstitution ?? ""));
  const email = currentUser?.email ?? initialData?.email ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName?.trim()) {
      const msg = "El nombre es obligatorio";
      setApiError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
      return;
    }
    if (!phone?.trim()) {
      const msg = "El teléfono es obligatorio";
      setApiError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
      return;
    }
    try {
      setApiError(null);
      const payload: UpdateMePayload = { fullName, phone, educationalInstitution: education };
      const res = await UserService.updateMe(payload);
      const resMsg = (res as { message?: string }).message ?? "Datos actualizados";
      toast({ title: "Éxito", description: resMsg, variant: "success" });
      await refreshSession();
    } catch (err) {
      let message = "No se pudo actualizar el perfil";
      if (err && typeof err === 'object') {
        const e = err as { message?: string; data?: { message?: string } };
        message = e.message ?? e.data?.message ?? message;
      }
      setApiError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  return {
    fullName,
    setFullName,
    phone,
    setPhone,
    education,
    setEducation,
    email,
    apiError,
    setApiError,
    handleSubmit,
  };
}
