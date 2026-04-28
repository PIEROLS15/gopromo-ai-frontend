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
import type { AdminUserRow } from "@/types/adminViews";

type UserDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUserRow | null;
  deleting: boolean;
  onConfirm: () => void;
};

const UserDeleteDialog = ({
  open,
  onOpenChange,
  user,
  deleting,
  onConfirm,
}: UserDeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100vw-2rem)] max-w-md left-1/2 -translate-x-1/2 rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente al usuario <strong>{user?.fullName}</strong>. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={deleting || !user}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDeleteDialog;
