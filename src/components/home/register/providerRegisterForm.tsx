"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  User,
  Building2,
  Hash,
  Mail,
  Phone,
  Lock,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { providerRegisterSchema } from "@/lib/validations/register.schema";

/* ---------- TYPES ---------- */

type ApiResponse = {
  status: "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

/* ---------- FIELD ---------- */

function Field({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon: React.ElementType;
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-zinc-200 mb-1">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input className="pl-11" {...props} />
      </div>
    </div>
  );
}

/* ---------- FORM ---------- */

export default function ProviderRegisterForm() {
  const { toast } = useToast();

  const [form, setForm] = useState({
    representativeName: "",
    companyName: "",
    ruc: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = providerRegisterSchema.safeParse(form);

    if (!parsed.success) {
      toast({
        title: "Error",
        description:
          parsed.error.issues[0]?.message ?? "Formulario inválido",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register-supplier`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            ruc: Number(form.ruc),
            representativeName: form.representativeName,
            companyName: form.companyName,
            phone: form.phone,
            password: form.password,
            roleId: 3,
          }),
        }
      );

      const data = (await res.json()) as ApiResponse;

      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0];
          throw new Error(firstError);
        }
        throw new Error(data.message);
      }

      toast({
        title: "Registro enviado",
        description: "Tu empresa será validada",
      });

    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Error al registrar proveedor",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field
        label="Nombre del representante"
        icon={User}
        placeholder="Juan Pérez"
        value={form.representativeName}
        onChange={(e) =>
          setForm({ ...form, representativeName: e.target.value })
        }
      />

      <Field
        label="Nombre de la empresa"
        icon={Building2}
        placeholder="GoPromo S.A."
        value={form.companyName}
        onChange={(e) =>
          setForm({ ...form, companyName: e.target.value })
        }
      />

      <Field
        label="RUC"
        icon={Hash}
        placeholder="20123456789"
        value={form.ruc}
        onChange={(e) =>
          setForm({ ...form, ruc: e.target.value })
        }
      />

      <Field
        label="Email empresarial"
        icon={Mail}
        type="email"
        placeholder="contacto@empresa.com"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <Field
        label="Teléfono"
        icon={Phone}
        placeholder="+51 999 999 999"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <Field
        label="Contraseña"
        icon={Lock}
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <Field
        label="Confirmar contraseña"
        icon={Lock}
        type="password"
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
      />

      <div className="flex items-center gap-3 pt-2">
        <Checkbox
          checked={form.acceptTerms}
          onCheckedChange={(v) =>
            setForm({ ...form, acceptTerms: v as boolean })
          }
        />
        <span className="text-xs text-zinc-400">
          Acepto los términos y condiciones
        </span>
      </div>

      <Button className="w-full mt-4" disabled={!form.acceptTerms}>
        Registrar proveedor
      </Button>
    </form>
  );
}

