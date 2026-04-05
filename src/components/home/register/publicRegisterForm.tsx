"use client";

import { useState } from "react";
import { User, Mail, Phone, Lock, School, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { Controller } from "react-hook-form";

const PublicRegisterForm = () => {
  const { public: publicRegister } = useRegister();
  const acceptTerms = publicRegister.watch("acceptTerms");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={publicRegister.handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label>Nombre completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tu nombre completo"
            className="pl-10"
            {...publicRegister.register("fullName")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="tu@email.com"
            className="pl-10"
            {...publicRegister.register("email")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Teléfono</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="+51 9 XXXX XXXX"
            className="pl-10"
            {...publicRegister.register("phone")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Institución educativa (Opcional)</Label>
        <div className="relative">
          <School className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Nombre de tu institución"
            className="pl-10"
            {...publicRegister.register("institution")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            className="pl-10 pr-10"
            {...publicRegister.register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Mínimo 8 caracteres</p>
      </div>

      <div className="space-y-2">
        <Label>Confirmar contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repite tu contraseña"
            className="pl-10 pr-10"
            {...publicRegister.register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Controller
          control={publicRegister.control}
          name="acceptTerms"
          render={({ field }) => (
            <Checkbox
              id="terms"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground cursor-pointer">
          Acepto términos y política de privacidad
        </Label>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11"
        disabled={!acceptTerms || publicRegister.loading || publicRegister.isSubmitting}
      >
        Crear cuenta
      </Button>

    </form>
  );
}

export default PublicRegisterForm;
