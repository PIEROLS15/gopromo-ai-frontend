"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  Hash,
  Mail,
  Phone,
  Lock,
  Eye,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { providerRegisterSchema } from "@/lib/validations/register.schema";
import { useRegister } from "@/hooks/useRegister";

/* ---------- FIELD ---------- */

function Field({
  label,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  helper,
  ...props
}: {
  label: string;
  icon: React.ElementType;
  rightIcon?: React.ElementType;
  onRightIconClick?: () => void;
  helper?: string;
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-zinc-200">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <Input
          className={`pl-11 ${RightIcon ? "pr-11" : ""}`}
          {...props}
        />

        {RightIcon && (
          <RightIcon
            onClick={onRightIconClick}
            className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-500"
          />
        )}
      </div>

      {helper && (
        <p className="text-xs text-zinc-400">{helper}</p>
      )}
    </div>
  );
}

/* ---------- FORM ---------- */

export default function ProviderRegisterForm() {
  const { toast } = useToast();
  const { registerProvider } = useRegister();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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
      await registerProvider({
        email: parsed.data.email,
        ruc: parsed.data.ruc,
        representativeName: parsed.data.representativeName,
        companyName: parsed.data.companyName,
        phone: parsed.data.phone,
        password: parsed.data.password,
      });

      toast({
        title: "Registro enviado",
        description: "Tu empresa fue registrada correctamente",
      });

      // 🚀 sesión creada → redirección
      router.push("/dashboard");
    } catch (error) {
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
          setForm({
            ...form,
            representativeName: e.target.value,
          })
        }
      />

      <Field
        label="Nombre de la empresa"
        icon={Building2}
        placeholder="GoPromo S.A."
        value={form.companyName}
        onChange={(e) =>
          setForm({
            ...form,
            companyName: e.target.value,
          })
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
        rightIcon={Eye}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        onRightIconClick={() =>
          setShowPassword((v) => !v)
        }
      />

      <Field
        label="Confirmar contraseña"
        icon={Lock}
        rightIcon={Eye}
        type={
          showConfirmPassword ? "text" : "password"
        }
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({
            ...form,
            confirmPassword: e.target.value,
          })
        }
        onRightIconClick={() =>
          setShowConfirmPassword((v) => !v)
        }
      />

      <div className="flex items-center gap-3 pt-2">
        <Checkbox
          checked={form.acceptTerms}
          onCheckedChange={(v) =>
            setForm({
              ...form,
              acceptTerms: v as boolean,
            })
          }
        />
        <span className="text-xs text-zinc-400">
          Acepto los términos y condiciones
        </span>
      </div>

      <Button className="w-full" disabled={!form.acceptTerms}>
        Registrar proveedor
      </Button>
    </form>
  );
}




