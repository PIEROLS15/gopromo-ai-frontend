import Image from "next/image";
import {
  ArrowLeftRight,
  Clock,
  Columns2,
  Loader2,
  MapPin,
  Search,
  Users,
} from "lucide-react";

import ResultsPagination from "@/components/shared/resultsPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getPackageDestination } from "@/hooks/useTourPackages";
import type { TourPackageResponse } from "@/types/tourPackage";

type PackagesResultsProps = {
  isLoading: boolean;
  loadError: boolean;
  filteredCount: number;
  packages: TourPackageResponse[];
  compareMode: boolean;
  compareSelected: TourPackageResponse[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onRetry: () => void;
  onViewDetails: (pkg: TourPackageResponse) => void;
  onToggleCompare: (pkg: TourPackageResponse) => void;
  onOpenCompare: () => void;
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
};

const getCardImage = (pkg: TourPackageResponse) => pkg.images?.[0]?.url ?? "/placeholder.jpg";

const PackagesResults = (props: PackagesResultsProps) => {
  const {
    isLoading,
    loadError,
    filteredCount,
    packages,
    compareMode,
    compareSelected,
    currentPage,
    totalPages,
    pageSize,
    onRetry,
    onViewDetails,
    onToggleCompare,
    onOpenCompare,
    onFirstPage,
    onPrevPage,
    onNextPage,
    onLastPage,
  } = props;

  return (
    <section className="container mx-auto px-4 py-12">
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Cargando paquetes...</span>
        </div>
      )}

      {loadError && (
        <div className="text-center py-16">
          <p className="text-destructive mb-4">Error al cargar los paquetes</p>
          <Button variant="outline" onClick={onRetry}>Reintentar</Button>
        </div>
      )}

      {!isLoading && !loadError && (
        <>
          {compareMode && compareSelected.length > 0 && (
            <div className="flex items-center justify-between bg-primary/10 border border-primary/30 rounded-xl px-5 py-3 mb-6 gap-4">
              <div className="flex items-center gap-3">
                <Columns2 className="w-5 h-5 text-primary shrink-0" />
                <span className="font-semibold text-foreground">Comparar paquetes seleccionados</span>
                <Badge variant="turquoise">{compareSelected.length}/2 seleccionados</Badge>
              </div>
              <Button disabled={compareSelected.length < 2} onClick={onOpenCompare} className="gap-2 shrink-0">
                <ArrowLeftRight className="w-4 h-4" /> Comparar ahora
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              <span className="font-bold text-foreground">{filteredCount}</span> paquetes encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const destination = getPackageDestination(pkg);
              const price = Number(pkg.pricePersona) || 0;
              return (
                <Card
                  key={pkg.id}
                  variant="package"
                  className="group cursor-pointer"
                  onClick={() => onViewDetails(pkg)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getCardImage(pkg)}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="orange">{pkg.category?.name}</Badge>
                    </div>
                    <Badge variant="price" className="absolute bottom-3 right-3 text-lg">S/{price}</Badge>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2">{pkg.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{destination}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {pkg.days} {pkg.days === 1 ? "dia" : "dias"}
                      </span>
                      <Badge variant="turquoise" className="ml-auto text-xs">{pkg.educationLevel?.name}</Badge>
                    </div>
                    <div className="flex gap-3 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" /> Minimo {pkg.minStudents} estudiantes
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                      onClick={(event) => {
                        event.stopPropagation();
                        onViewDetails(pkg);
                      }}
                    >
                      Ver detalles
                    </Button>

                    {compareMode && (
                      <div
                        className="flex items-center gap-2 mt-3 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleCompare(pkg);
                        }}
                      >
                        <Checkbox
                          checked={compareSelected.some((item) => item.id === pkg.id)}
                          onCheckedChange={() => onToggleCompare(pkg)}
                          onClick={(event) => event.stopPropagation()}
                        />
                        <span className="text-sm text-muted-foreground select-none">Seleccionar para comparar</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredCount === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No se encontraron paquetes</h3>
              <p className="text-muted-foreground">Intenta con otros filtros o terminos de busqueda</p>
            </div>
          )}

          <ResultsPagination
            totalItems={filteredCount}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onFirstPage={onFirstPage}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onLastPage={onLastPage}
          />
        </>
      )}
    </section>
  );
};

export default PackagesResults;
