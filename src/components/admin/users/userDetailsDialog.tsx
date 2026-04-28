import { Building2, Calendar, Mail, Phone, User } from "lucide-react";

import StatusBadge from "@/components/admin/ui/statusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatAdminDate } from "@/services/adminData.service";
import type { UserDetails } from "@/types/adminUsers";

type UserDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  user: UserDetails | null;
};

const UserDetailsDialog = ({
  open,
  onOpenChange,
  loading,
  user,
}: UserDetailsDialogProps) => {
  const initials =
    user?.fullName
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") ?? "US";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md max-h-[85vh] overflow-y-auto left-1/2 -translate-x-1/2 rounded-xl">
        <DialogHeader>
          <DialogTitle>Detalles del usuario</DialogTitle>
          <DialogDescription>Informacion completa del usuario seleccionado.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-8 grid place-items-center">
            <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : user ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarFallback className="bg-primary/10 text-primary text-4xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nombre completo</p>
                  <p className="font-medium text-foreground">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <p className="font-medium text-foreground">{user.phone || "No registrado"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Institucion educativa</p>
                  <p className="font-medium text-foreground">{user.educationalInstitution || "No registrada"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de registro</p>
                  <p className="font-medium text-foreground">{formatAdminDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5" />
                <div>
                  <p className="text-sm text-muted-foreground">Rol</p>
                  <StatusBadge label={user.role.name as "Admin" | "Supplier" | "User"} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No se encontro informacion del usuario.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
