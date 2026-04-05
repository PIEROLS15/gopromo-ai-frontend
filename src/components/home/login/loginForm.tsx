"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    loading,
    apiError,
  } = useLogin();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8 lg:hidden">
          <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
        </div>

        <h2 className="text-xl font-semibold mb-6 hidden lg:block">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="font-medium">Email</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="tu@email.com"
                className="pl-10 h-12"
                {...register("email")}
              />
            </div>

            {errors.email?.message && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Contraseña</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-12"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {errors.password?.message && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {apiError && (
            <p className="text-sm text-destructive text-center">
              {apiError}
            </p>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="remember" className="flex items-center gap-2 cursor-pointer select-none font-normal">
              <Checkbox id="remember" />
              Recuérdame
            </Label>

            <button
              type="button"
              className="text-sm text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
          </Button>

          <div className="flex items-center gap-4">
            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-700" />
            <span className="text-xs uppercase text-muted-foreground">O</span>
            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-700" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
