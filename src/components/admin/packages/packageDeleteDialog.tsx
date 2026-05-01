import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { AdminPackage } from "@/types/adminViews";

type PackageDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pkg: AdminPackage | null;
  deleting: boolean;
  onConfirm: () => void;
};

const PackageDeleteDialog = ({
  open,
  onOpenChange,
  pkg,
  deleting,
  onConfirm,
}: PackageDeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100vw-2rem)] max-w-md left-1/2 -translate-x-1/2 rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar paquete?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion eliminara permanentemente el paquete <strong>{pkg?.name}</strong>. Esta accion no
            se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={deleting || !pkg}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PackageDeleteDialog;
