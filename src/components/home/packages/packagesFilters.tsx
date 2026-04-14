import { ArrowLeftRight, SlidersHorizontal, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { LocationOption } from "@/types/packageCatalog";

type IdNameOption = {
  id: number;
  name: string;
};

type PackagesFiltersProps = {
  showFilters: boolean;
  compareMode: boolean;
  searchQuery: string;
  selectedDepartment: string;
  selectedProvince: string;
  selectedDistrict: string;
  selectedCategory: string;
  selectedLevel: string;
  priceRange: [number, number];
  maxPrice: number;
  departments: LocationOption[];
  provinces: LocationOption[];
  districts: LocationOption[];
  categories: IdNameOption[];
  educationLevels: IdNameOption[];
  hasActiveFilters: boolean;
  onToggleFilters: () => void;
  onToggleCompareMode: () => void;
  onSearchQueryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
};

const PackagesFilters = (props: PackagesFiltersProps) => {
  const {
    showFilters,
    compareMode,
    searchQuery,
    selectedDepartment,
    selectedProvince,
    selectedDistrict,
    selectedCategory,
    selectedLevel,
    priceRange,
    maxPrice,
    departments,
    provinces,
    districts,
    categories,
    educationLevels,
    hasActiveFilters,
    onToggleFilters,
    onToggleCompareMode,
    onSearchQueryChange,
    onDepartmentChange,
    onProvinceChange,
    onDistrictChange,
    onCategoryChange,
    onLevelChange,
    onPriceRangeChange,
    onClearFilters,
  } = props;

  return (
    <section className="container mx-auto px-4 -mt-12 relative z-10 mb-8">
      <div className="bg-card rounded-2xl p-6 shadow-elegant max-w-5xl mx-auto">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar destino o paquete..."
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              className="pl-12 h-12 w-full"
            />
          </div>
          <Button
            variant={compareMode ? "default" : "outline"}
            className="h-12 px-4 shrink-0 gap-2"
            onClick={onToggleCompareMode}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span className="hidden sm:inline">Comparar</span>
          </Button>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="icon"
            className="h-12 w-12 shrink-0"
            onClick={onToggleFilters}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {showFilters && (
          <div className="space-y-4 pt-2 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Departamento</Label>
                <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                  <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los departamentos</SelectItem>
                    {departments.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Provincia</Label>
                <Select
                  value={selectedProvince}
                  onValueChange={onProvinceChange}
                  disabled={selectedDepartment === "all"}
                >
                  <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Todas" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las provincias</SelectItem>
                    {provinces.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Distrito</Label>
                <Select
                  value={selectedDistrict}
                  onValueChange={onDistrictChange}
                  disabled={selectedProvince === "all"}
                >
                  <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los distritos</SelectItem>
                    {districts.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Categoria</Label>
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Todas" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorias</SelectItem>
                    {categories.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Nivel educativo</Label>
                <Select value={selectedLevel} onValueChange={onLevelChange}>
                  <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    {educationLevels.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Precio: S/{priceRange[0]} - S/{priceRange[1]}
                </Label>
                <div className="pt-2 px-1">
                  <Slider
                    min={0}
                    max={maxPrice}
                    step={50}
                    value={priceRange}
                    onValueChange={(value) => {
                      if (value.length !== 2) return;
                      onPriceRangeChange([value[0], value[1]]);
                    }}
                  />
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-1">
                  <X className="w-4 h-4" /> Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesFilters;
