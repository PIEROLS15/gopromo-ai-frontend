"use client";
import React, { useState } from "react";
import PasswordService from "@/services/password.service";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ProfileSecurityCard(): React.ReactElement {
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
      await PasswordService.changePassword({ password: newPassword });
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
        toast({ title: "Error", description: "Endpoint de cambio de contraseña no encontrado (404). Verifica la ruta en el backend.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: backendMsg, variant: "destructive" });
      }
    }
  };

  return (
    <Card className="bg-card border border-white/80 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Seguridad
        </div>
        <CardDescription>Cambia tu contraseña para mantener tu cuenta segura</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4" /> Nueva contraseña
            </label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="bg-muted/40 pr-10"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4" />
              Confirmar nueva contraseña
            </label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Repite la nueva contraseña" className="bg-muted/40 pr-10"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
          </div>
          <Button variant="outline" className="gap-2" type="submit">
            <Lock className="w-4 h-4" />
            Cambiar Contraseña
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
