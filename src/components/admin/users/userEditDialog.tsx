import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserDetails } from "@/types/adminUsers";

type UserEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  user: UserDetails | null;
  saving: boolean;
  onSave: (params: {
    userId: number;
    fullName: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => void;
};

const UserEditDialog = ({
  open,
  onOpenChange,
  loading,
  user,
  saving,
  onSave,
}: UserEditDialogProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFullName(user.fullName ?? "");
    setPhone(user.phone ?? "");
    setInstitution(user.educationalInstitution ?? "");
    setPassword("");
    setConfirmPassword("");
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md max-h-[85vh] overflow-y-auto left-1/2 -translate-x-1/2 rounded-xl">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>Modifica los datos del usuario</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-8 grid place-items-center">
            <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : user ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre completo *</Label>
              <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Telefono</Label>
              <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Institucion educativa</Label>
              <Input
                value={institution}
                onChange={(event) => setInstitution(event.target.value)}
                placeholder="No registrada"
                disabled
              />
            </div>

            <div className="pt-1 border-t border-border" />

            <div className="space-y-2">
              <Label>Nueva contraseña</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimo 8 caracteres"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((state) => !state)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repite la contraseña"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword((state) => !state)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                variant="turquoise"
                disabled={saving || !fullName.trim()}
                onClick={() =>
                  onSave({
                    userId: user.id,
                    fullName: fullName.trim(),
                    phone: phone.trim(),
                    password,
                    confirmPassword,
                  })
                }
              >
                Guardar cambios
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No se encontro informacion del usuario.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
