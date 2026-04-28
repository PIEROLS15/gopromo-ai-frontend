import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  SuppliersActiveFilter,
  SuppliersVerificationFilter,
} from "@/types/adminViews";

type SuppliersFiltersProps = {
  suppliersSearch: string;
  onSuppliersSearchChange: (value: string) => void;
  verifiedFilter: SuppliersVerificationFilter;
  onVerifiedFilterChange: (value: SuppliersVerificationFilter) => void;
  activeFilter: SuppliersActiveFilter;
  onActiveFilterChange: (value: SuppliersActiveFilter) => void;
};

const SuppliersFilters = ({
  suppliersSearch,
  onSuppliersSearchChange,
  verifiedFilter,
  onVerifiedFilterChange,
  activeFilter,
  onActiveFilterChange,
}: SuppliersFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={suppliersSearch}
          onChange={(event) => onSuppliersSearchChange(event.target.value)}
          placeholder="Buscar por nombre o RUC..."
          className="pl-10 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!"
        />
      </div>

      <Select value={verifiedFilter} onValueChange={onVerifiedFilterChange}>
        <SelectTrigger className="w-full lg:w-45 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!">
          <SelectValue placeholder="Verificacion" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-(--admin-surface) border-primary/40">
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="verified">Verificados</SelectItem>
          <SelectItem value="pending">Pendientes</SelectItem>
        </SelectContent>
      </Select>

      <Select value={activeFilter} onValueChange={onActiveFilterChange}>
        <SelectTrigger className="w-full lg:w-45 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-(--admin-surface) border-primary/40">
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Activos</SelectItem>
          <SelectItem value="inactive">Inactivos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SuppliersFilters;
