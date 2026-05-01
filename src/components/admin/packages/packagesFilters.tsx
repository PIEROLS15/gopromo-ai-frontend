import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PackagesActiveFilter } from "@/types/adminViews";

type PackagesFiltersProps = {
  packagesSearch: string;
  onPackagesSearchChange: (value: string) => void;
  activeFilter: PackagesActiveFilter;
  onActiveFilterChange: (value: PackagesActiveFilter) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (value: string) => void;
  provinceFilter: string;
  onProvinceFilterChange: (value: string) => void;
  districtFilter: string;
  onDistrictFilterChange: (value: string) => void;
  departmentOptions: string[];
  provinceOptions: string[];
  districtOptions: string[];
};

const PackagesFilters = ({
  packagesSearch,
  onPackagesSearchChange,
  activeFilter,
  onActiveFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  provinceFilter,
  onProvinceFilterChange,
  districtFilter,
  onDistrictFilterChange,
  departmentOptions,
  provinceOptions,
  districtOptions,
}: PackagesFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={packagesSearch}
          onChange={(event) => onPackagesSearchChange(event.target.value)}
          placeholder="Buscar por nombre, proveedor o destino..."
          className="pl-10 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!"
        />
      </div>

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

      <Select value={departmentFilter} onValueChange={onDepartmentFilterChange}>
        <SelectTrigger className="w-full lg:w-52 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!">
          <SelectValue placeholder="Departamento" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-(--admin-surface) border-primary/40">
          <SelectItem value="all">Todos</SelectItem>
          {departmentOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={provinceFilter} onValueChange={onProvinceFilterChange}>
        <SelectTrigger className="w-full lg:w-52 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!">
          <SelectValue placeholder="Provincia" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-(--admin-surface) border-primary/40">
          <SelectItem value="all">Todas</SelectItem>
          {provinceOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={districtFilter} onValueChange={onDistrictFilterChange}>
        <SelectTrigger className="w-full lg:w-52 bg-white dark:bg-(--admin-surface) border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 transition-none!">
          <SelectValue placeholder="Distrito" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-(--admin-surface) border-primary/40">
          <SelectItem value="all">Todos</SelectItem>
          {districtOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PackagesFilters;
