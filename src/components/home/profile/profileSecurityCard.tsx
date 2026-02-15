import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const profileSecurityCard = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <>
            <Card className="bg-card border border-white/80 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Seguridad
                    </CardTitle>
                    <CardDescription>
                        Cambia tu contraseña
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-5">
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-sm">
                                <Lock className="w-4 h-4" />
                                Nueva contraseña
                            </label>
                            <div className="relative">
                                <Input type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" className="bg-muted/40 pr-10"/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-sm">
                                <Lock className="w-4 h-4" />
                                Confirmar nueva contraseña
                            </label>
                            <div className="relative">
                                <Input type={showConfirmPassword ? "text" : "password"}placeholder="Repite la nueva contraseña" className="bg-muted/40 pr-10"/>
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Lock className="w-4 h-4" />
                            Cambiar Contraseña
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

export default profileSecurityCard;
