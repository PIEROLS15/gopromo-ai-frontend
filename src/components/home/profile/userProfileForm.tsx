import { User, Mail, Phone, GraduationCap, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/context/sessionContext";
import UserService from "@/services/user.service";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  initialData?: {
    fullName?: string;
    email?: string;
    phone?: string;
    educationalInstitution?: string;
  };
}

const UserProfileForm = ({ initialData }: Props) => {
  const { toast } = useToast();
  const { refreshSession, user } = useSession();
  type UserRecord = { fullName?: string; email?: string; phone?: string; educationalInstitution?: string };
  const currentUser = (user as unknown) as UserRecord | null;
  const [apiError, setApiError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>(initialData?.fullName ?? (currentUser?.fullName ?? ""));
  const [phone, setPhone] = useState<string>(initialData?.phone ?? (currentUser?.phone ?? ""));
  const [education, setEducation] = useState<string>(
      initialData?.educationalInstitution ?? (currentUser?.educationalInstitution ?? "")
    );
  const email = currentUser?.email ?? initialData?.email ?? "";

    React.useEffect(() => {
      if (user) {
        if (currentUser?.fullName) setFullName(currentUser.fullName);
        if (currentUser?.phone) setPhone(currentUser.phone);
        if (currentUser?.educationalInstitution) setEducation(currentUser.educationalInstitution);
      }
    }, [user, currentUser?.fullName, currentUser?.phone, currentUser?.educationalInstitution, education]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation to prevent invalid payloads
    if (!fullName?.trim()) {
      const msg = "El nombre es obligatorio";
      setApiError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
      return;
    }
    if (!phone?.trim()) {
      const msg = "El teléfono es obligatorio";
      setApiError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
      return;
    }
    try {
        setApiError(null);
        const payload: { fullName?: string; phone?: string } = { fullName, phone };
        // Debug payload sent to API (remove in production)
        console.debug("Profile update payload (user):", payload);
        const res = await UserService.updateMe(payload);
        toast({ title: "Éxito", description: res.message, variant: "success" });
        await refreshSession();
      } catch (err) {
        let message = "No se pudo actualizar el perfil";
        if (err && typeof err === 'object') {
          const e = err as { message?: string; data?: { message?: string } };
          message = e.message ?? e.data?.message ?? message;
        }
        setApiError(message);
        toast({ title: "Error", description: message, variant: "destructive" });
      }
    };

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
                        <Input value={fullName} onChange={(e)=>setFullName((e.target as HTMLInputElement).value)} className="bg-background/80 border-white/10"/>
                    </div>
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4" />
                            Correo Electrónico
                        </label>
                                <Input value={email} readOnly className="bg-background/80 border-white/10 opacity-70 cursor-not-allowed select-none"/>
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
                        <Input value={phone} onChange={(e)=>setPhone((e.target as HTMLInputElement).value)} className="bg-background/80 border-white/10"/>
                    </div>
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm">
                            <GraduationCap className="w-4 h-4" />
                            Institución Educativa
                        </label>
                        <Input placeholder={education || "Nombre de tu institución"} value={education} onChange={(e)=>setEducation((e.target as HTMLInputElement).value)} className="bg-background/80 border-white/10"/>
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
