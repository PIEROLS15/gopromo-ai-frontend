import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AdminUserRow } from "@/types/adminViews";

type UserActionsMenuProps = {
  user: AdminUserRow;
  disabled?: boolean;
  onViewDetails: (userId: number) => void;
  onEdit: (userId: number) => void;
  onDelete: (user: AdminUserRow) => void;
};

const UserActionsMenu = ({
  user,
  disabled,
  onViewDetails,
  onEdit,
  onDelete,
}: UserActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Opciones usuario" disabled={disabled}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => onViewDetails(user.id)}>
          <Eye className="w-4 h-4 mr-2" />
          Ver detalles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(user.id)}>
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(user)}>
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar usuario
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionsMenu;
