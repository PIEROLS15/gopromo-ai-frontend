import { Building2, User, Phone, Save, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/context/sessionContext";
import UserService from "@/services/user.service";

interface Props {
  initialData?: {
    representativeName?: string;
    companyName?: string;
    email?: string;
    phone?: string;
    ruc?: string;
  };
}

const SupplierProfileForm = ({ initialData }: Props) => {
  const { refreshSession } = useSession();
  const { toast } = useToast();
  const [apiError, setApiError] = useState<string | null>(null);
  const [representativeName, setRepresentativeName] = useState<string>(initialData?.representativeName ?? "");
  const [companyName, setCompanyName] = useState<string>(initialData?.companyName ?? "");
  const [email] = useState<string>(initialData?.email ?? "");
  const [phone, setPhone] = useState<string>(initialData?.phone ?? "");
  const [ruc] = useState<string>(initialData?.ruc ?? "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload: { representativeName?: string; companyName?: string; phone?: string } = {
        representativeName,
        companyName,
        phone,
      };
      const res = await UserService.updateMe(payload) as unknown as { message?: string };
      setApiError(null);
      const message = res?.message ?? "Datos actualizados";
      toast({ title: "Éxito", description: message, variant: "success" });
      await refreshSession();
    } catch (err: unknown) {
      let message = "No se pudo actualizar la empresa";
      if (typeof err === 'object' && err !== null) {
        const e = err as { message?: string; data?: { message?: string }; errors?: Record<string, string[]> };
        message = e.message ?? e.data?.message ?? (e.errors ? Object.values(e.errors).flat().join("; ") : message);
      }
      setApiError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <Building2 className="w-5 h-5" />
        <span className="text-xl font-semibold">Datos de la Empresa</span>
      </div>
      <div className="text-sm text-muted-foreground mb-2">Información de tu empresa visible para los clientes</div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm mb-1"><User className="w-4 h-4" /> Nombre del Representante</div>
            <Input value={representativeName} onChange={(e)=>setRepresentativeName((e.target as HTMLInputElement).value)} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm mb-1"><Building2 className="w-4 h-4" /> Nombre de la Empresa</div>
            <Input value={companyName} onChange={(e)=>setCompanyName((e.target as HTMLInputElement).value)} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm mb-1"><Mail className="w-4 h-4" /> Correo Electrónico</div>
            <Input value={email} readOnly className="bg-background/80 border-white/10 opacity-70 cursor-not-allowed select-none" />
            <p className="text-xs text-muted-foreground">El correo no puede ser modificado</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm mb-1"><Phone className="w-4 h-4" /> Teléfono</div>
            <Input value={phone} onChange={(e)=>setPhone((e.target as HTMLInputElement).value)} />
          </div>
        </div>
        <div className="grid sm:grid-cols-1 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm mb-1"><Building2 className="w-4 h-4" /> RUC</div>
            <Input value={ruc} disabled />
            <p className="text-xs text-muted-foreground">El RUC no puede ser modificado por seguridad</p>
          </div>
        </div>
        <Separator />
        <Button className="gap-2" type="submit" disabled={submitting}>
          <Save className="w-4 h-4" />
          Guardar Cambios
        </Button>
        {apiError && <div className="text-sm text-red-600 mt-2">{apiError}</div>}
      </form>
    </>
  );
};

export default SupplierProfileForm;
