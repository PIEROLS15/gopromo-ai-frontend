"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, School, Eye } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { publicRegisterSchema } from "@/lib/validations/register.schema";
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

export default function PublicRegisterForm() {
  const { toast } = useToast();
  const { registerPublic } = useRegister();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = publicRegisterSchema.safeParse(form);
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
      await registerPublic({
        email: parsed.data.email,
        fullName: parsed.data.fullName,
        educationalInstitution: form.institution || null,
        phone: parsed.data.phone || null,
        password: parsed.data.password,
      });

      toast({
        title: "Registro exitoso",
        description: "Cuenta creada correctamente",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Error al registrar",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field
        label="Nombre completo"
        icon={User}
        placeholder="Tu nombre completo"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

      <Field
        label="Email"
        icon={Mail}
        type="email"
        placeholder="tu@email.com"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <Field
        label="Teléfono"
        icon={Phone}
        placeholder="+51 9 XXXX XXXX"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <Field
        label="Institución educativa (Opcional)"
        icon={School}
        placeholder="Nombre de tu institución"
        value={form.institution}
        onChange={(e) =>
          setForm({ ...form, institution: e.target.value })
        }
      />

      <Field
        label="Contraseña"
        icon={Lock}
        rightIcon={Eye}
        type={showPassword ? "text" : "password"}
        placeholder="Mínimo 8 caracteres"
        helper="Mínimo 8 caracteres"
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
        placeholder="Repite tu contraseña"
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

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          checked={form.acceptTerms}
          onCheckedChange={(v) =>
            setForm({
              ...form,
              acceptTerms: v as boolean,
            })
          }
        />
        <span className="text-sm text-zinc-300">
          Acepto términos y política de privacidad
        </span>
      </div>

      <Button
        className="w-full h-12"
        disabled={!form.acceptTerms}
      >
        Crear cuenta
      </Button>
    </form>
  );
}










