"use client";
import React, { useState } from "react";
import type { SupplierInitial } from "@/types/login";
import { useSession } from "@/context/sessionContext";
import { useToast } from "@/hooks/use-toast";
import UserService from "@/services/user.service";

export function useSupplierProfileForm(initialData?: SupplierInitial) {
  const { refreshSession } = useSession();
  const { toast } = useToast();
  const [apiError, setApiError] = useState<string | null>(null);
  const [representativeName, setRepresentativeName] = useState<string>(initialData?.representativeName ?? "");
  const [companyName, setCompanyName] = useState<string>(initialData?.companyName ?? "");
  const [email] = useState<string>(initialData?.email ?? "");
  const [phone, setPhone] = useState<string>(initialData?.phone ?? "");
  const [ruc] = useState<string>(initialData?.ruc ?? "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload: { representativeName?: string; companyName?: string; phone?: string } = {
        representativeName,
        companyName,
        phone,
      };
      const res = await UserService.updateMe(payload) as unknown as { message?: string };
      setApiError(null);
      const message = res?.message ?? "Datos actualizados";
      toast({ title: "Éxito", description: message, variant: "success" });
      await refreshSession();
    } catch (err: unknown) {
      let message = "No se pudo actualizar la empresa";
      if (typeof err === 'object' && err !== null) {
        const e = err as { message?: string; data?: { message?: string }; errors?: Record<string, string[]> };
        message = e.message ?? e.data?.message ?? (e.errors ? Object.values(e.errors).flat().join("; ") : message);
      }
      setApiError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    representativeName,
    setRepresentativeName,
    companyName,
    setCompanyName,
    email,
    phone,
    setPhone,
    ruc,
    submitting,
    setSubmitting,
    apiError,
    setApiError,
    handleSubmit,
  };
}
