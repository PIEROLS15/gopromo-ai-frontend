import {
  Building2,
  Calendar,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";

import StatusBadge from "@/components/admin/ui/statusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  getSupplierDaysFromDate,
  getSupplierInitials,
} from "@/lib/admin/suppliers";
import { formatAdminDate } from "@/services/adminData.service";
import type { AdminSupplier } from "@/types/adminViews";

type SupplierDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  supplier: AdminSupplier | null;
};

const SupplierDetailsDialog = ({
  open,
  onOpenChange,
  loading,
  supplier,
}: SupplierDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalles del proveedor</DialogTitle>
          <DialogDescription>
            Informacion completa del proveedor seleccionado.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-8 grid place-items-center">
            <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : supplier ? (
          <div className="space-y-5">
            <div className="flex flex-col items-center text-center gap-3">
                <Avatar className="h-20 w-20 border-2 border-primary/30">
                  <AvatarFallback className="text-xl font-semibold bg-primary/15 text-primary">
                    {getSupplierInitials(supplier.representativeName || supplier.companyName) || "PR"}
                  </AvatarFallback>
                </Avatar>

              <div>
                <p className="text-lg font-bold text-foreground uppercase tracking-tight">
                  {supplier.representativeName}
                </p>
                <p className="text-sm text-muted-foreground">{supplier.companyName}</p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge label={supplier.verified ? "Verificado" : "Pendiente"} />
                <StatusBadge label={supplier.active ? "Activo" : "Inactivo"} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Correo electronico</p>
                  <p className="text-muted-foreground">{supplier.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Telefono</p>
                  <p className="text-muted-foreground">{supplier.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">RUC</p>
                  <p className="text-muted-foreground">{supplier.ruc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Rol del sistema</p>
                  <p className="text-muted-foreground">Proveedor</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Fecha de registro</p>
                  <p className="text-muted-foreground">{formatAdminDate(supplier.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Estado de la cuenta</p>
                  <p className="text-muted-foreground mb-2">
                    {supplier.active
                      ? "Cuenta activa y operativa"
                      : "Cuenta inactiva, requiere activacion"}
                  </p>
                  <StatusBadge label={supplier.active ? "Activo" : "Inactivo"} />
                </div>
              </div>
            </div>

            <Separator />

            <Card className="bg-muted/40">
              <CardContent className="py-4">
                <p className="text-sm font-medium text-foreground mb-3">Estadisticas</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">{getSupplierDaysFromDate(supplier.createdAt)}</p>
                    <p className="text-xs text-muted-foreground">Dias en plataforma</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{supplier.verified ? 100 : 50}%</p>
                    <p className="text-xs text-muted-foreground">Nivel de verificacion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No se encontro informacion del proveedor.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SupplierDetailsDialog;
