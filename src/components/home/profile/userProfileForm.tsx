import { User, Mail, Phone, GraduationCap, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const UserProfileForm = () => {
    return (
        <>
            <Card className="bg-card border border-white/80 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Datos Personales
                    </CardTitle>
                    <CardDescription>
                        Tu información personal y de contacto
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4" />
                                    Nombre Completo
                                </label>
                                <Input placeholder="Tu nombre completo" className="bg-background/80 border-white/10"/>
                            </div>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4" />
                                    Correo Electrónico
                                </label>
                                <Input value="demo@email.com" disabled className="bg-background/80 border-white/10"/>
                                <p className="text-xs text-muted-foreground">
                                    El correo no se puede modificar
                                </p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4" />
                                    Teléfono
                                </label>
                                <Input placeholder="+51 999 888 777" className="bg-background/80 border-white/10"/>
                            </div>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm">
                                    <GraduationCap className="w-4 h-4" />
                                    Institución Educativa
                                </label>
                                <Input placeholder="Nombre de tu institución" className="bg-background/80 border-white/10"/>
                            </div>
                        </div>
                        <Separator />
                        <Button className="gap-2">
                            <Save className="w-4 h-4" />
                            Guardar Cambios
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

export default UserProfileForm;
