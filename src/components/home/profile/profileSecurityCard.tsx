"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useProfileSecurity } from "@/hooks/useProfileSecurity";

const ProfileSecurityCard = (): React.ReactElement => {
  const {
    showPassword,
    setShowPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  } = useProfileSecurity();

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
              <Input type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="bg-muted/40 border-border pr-10"/>
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
              <Input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Repite la nueva contraseña" className="bg-muted/40 border-border pr-10"/>
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
};

export default ProfileSecurityCard;
