import { Bus, Cpu, Shield, ShieldCheck, UserCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PackageDetailsSafetyCard = () => {
  return (
    <Card className="overflow-hidden border-primary/10">
      <div className="bg-linear-to-r from-primary/8 to-transparent px-5 sm:px-8 py-3 sm:py-4 border-b border-border">
        <div className="flex items-center gap-2 sm:gap-3">
          <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
          <h3 className="font-bold text-foreground text-base sm:text-xl">Medidas de Seguridad</h3>
        </div>
      </div>

      <CardContent className="px-5 sm:px-8 pt-4 sm:pt-5 pb-4 sm:pb-5">
        <div className="grid grid-cols-2 gap-4">
          {[
            { Icon: Bus, label: "Transporte autorizado" },
            { Icon: ShieldCheck, label: "Seguro al 100%" },
            { Icon: Cpu, label: "Monitoreo GPS" },
            { Icon: UserCheck, label: "Staff calificado" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-start gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="pt-0.5">
                <p className="text-foreground font-bold text-xs sm:text-sm leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-primary shrink-0" />
          <span>Proveedor verificado</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageDetailsSafetyCard;
