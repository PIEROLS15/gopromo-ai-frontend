"use client";

import { useState } from "react";
import {
  User,
  Building2,
  Hash,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { Controller } from "react-hook-form";

const SupplierRegisterForm = () => {
  const { provider: provider } = useRegister();
  const acceptTerms = provider.watch("acceptTerms");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={provider.handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label>Nombre del representante</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Juan Pérez"
            className="pl-10"
            {...provider.register("representativeName")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Nombre de la empresa</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="GoPromo S.A."
            className="pl-10"
            {...provider.register("companyName")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>RUC</Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="20123456789"
            className="pl-10"
            {...provider.register("ruc")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Email empresarial</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="contacto@empresa.com"
            className="pl-10"
            {...provider.register("email")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Teléfono</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="+51 999 999 999"
            className="pl-10"
            {...provider.register("phone")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            {...provider.register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Confirmar contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            {...provider.register("confirmPassword")}
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

      {/* Alert block inserted here */}
      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
          Tu RUC será verificado con RENIEC y SUNAT. El proceso puede tomar entre 24 y 48 horas.
        </AlertDescription>
      </Alert>

      <div className="flex items-center gap-2">
        <Controller
          control={provider.control}
          name="acceptTerms"
          render={({ field }) => (
            <Checkbox
              id="terms-provider"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="terms-provider" className="text-xs font-normal text-muted-foreground cursor-pointer">
          Acepto los términos y condiciones
        </Label>
      </div>

      <Button
        className="w-full"
        disabled={!acceptTerms || provider.loading || provider.isSubmitting}
      >
        Registrar proveedor
      </Button>

    </form>
  );
}

export default SupplierRegisterForm;
