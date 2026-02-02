"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { form, setForm, errors, loading, handleSubmit } = useLogin(rememberMe);
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
        {/* Mobile title */}
        <div className="text-center mb-8 lg:hidden">
          <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
        </div>

        <h2 className="text-xl font-semibold mb-6 hidden lg:block">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="tu@email.com"
                className="pl-10 h-12 bg-muted/80! border-border! focus:bg-muted/70!"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                } />
            </div>

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Contraseña</label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-12 bg-muted/80! border-border! focus:bg-muted/70!"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                } />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-sm text-destructive text-center">
              {errors.general}
            </p>
          )}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <span className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer h-4 w-4 appearance-none rounded-full border border-primary checked:bg-primary checked:border-primary transition"
                />

                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round">

                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Recuérdame
            </label>

            <button
              type="button"
              className="text-sm text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">O</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <button type="button" onClick={() => router.push("/register")} className="text-primary hover:underline">
              Regístrate aquí
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;