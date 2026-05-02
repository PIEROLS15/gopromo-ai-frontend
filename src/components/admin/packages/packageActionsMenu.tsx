import { Eye, EyeOff, MoreVertical, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AdminPackage } from "@/types/adminViews";

type PackageActionsMenuProps = {
  pkg: AdminPackage;
  disabled?: boolean;
  onViewDetails: (packageId: number) => void;
  onToggleActive: (pkg: AdminPackage) => void;
  onDelete: (pkg: AdminPackage) => void;
};

const PackageActionsMenu = ({
  pkg,
  disabled,
  onViewDetails,
  onToggleActive,
  onDelete,
}: PackageActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Opciones paquete" disabled={disabled}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => onViewDetails(pkg.id)}>
          <Eye className="w-4 h-4 mr-2" />
          Ver detalles
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onToggleActive(pkg)}>
          {pkg.active ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Desactivar
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Activar
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(pkg)}>
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar paquete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PackageActionsMenu;
