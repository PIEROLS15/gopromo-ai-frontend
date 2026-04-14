import { User, Mail, Phone, GraduationCap, Save } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { UserInitial } from "@/types/login";
import { useUserProfileForm } from "@/hooks/useUserProfileForm";

interface Props {
  initialData?: UserInitial;
}

const UserProfileForm = ({ initialData }: Props) => {
  const {
    fullName, setFullName,
    phone, setPhone,
    education, setEducation,
    email,
    apiError,
    handleSubmit,
  } = useUserProfileForm(initialData);

  return (
        <>
            <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5" />
                <span className="text-lg font-semibold">Datos Personales</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">Tu información personal y de contacto</div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4" />
                            Nombre Completo
                        </label>
                        <Input value={fullName} onChange={(e)=>setFullName((e.target as HTMLInputElement).value)} className="bg-muted/40 border-border"/>
                    </div>
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4" />
                            Correo Electrónico
                        </label>
                                <Input value={email} readOnly className="bg-muted/55 border-border text-muted-foreground opacity-100 cursor-not-allowed select-none"/>
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
                        <Input value={phone} onChange={(e)=>setPhone((e.target as HTMLInputElement).value)} className="bg-muted/40 border-border"/>
                    </div>
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm">
                            <GraduationCap className="w-4 h-4" />
                            Institución Educativa
                        </label>
                        <Input placeholder={education || "Nombre de tu institución"} value={education} onChange={(e)=>setEducation((e.target as HTMLInputElement).value)} className="bg-muted/40 border-border"/>
                    </div>
                </div>
                        <Separator />
                        {apiError && <div className="text-sm text-destructive-foreground mt-2">{apiError}</div>}
                <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                </Button>
            </form>
        </>
    );
}

export default UserProfileForm;
