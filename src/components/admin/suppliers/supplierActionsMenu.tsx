import { CheckCircle2, Eye, EyeOff, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AdminSupplier } from "@/types/adminViews";

type SupplierActionsMenuProps = {
  supplier: AdminSupplier;
  disabled?: boolean;
  onViewDetails: (supplierId: number) => void;
  onApprove: (supplier: AdminSupplier) => void;
  onToggleActive: (supplier: AdminSupplier) => void;
};

const SupplierActionsMenu = ({
  supplier,
  disabled,
  onViewDetails,
  onApprove,
  onToggleActive,
}: SupplierActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Opciones proveedor" disabled={disabled}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => onViewDetails(supplier.id)}>
          <Eye className="w-4 h-4 mr-2" />
          Ver detalles
        </DropdownMenuItem>

        {!supplier.verified ? (
          <DropdownMenuItem onClick={() => onApprove(supplier)}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Aprobar proveedor
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem onClick={() => onToggleActive(supplier)}>
          {supplier.active ? (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SupplierActionsMenu;
