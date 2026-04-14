import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getPackageDestination } from "@/hooks/useTourPackages";
import type { TourPackageResponse } from "@/types/tourPackage";

type PackagesCompareModalProps = {
  open: boolean;
  packages: TourPackageResponse[];
  onOpenChange: (open: boolean) => void;
  onViewDetails: (pkg: TourPackageResponse) => void;
};

const PackagesCompareModal = (props: PackagesCompareModalProps) => {
  const { open, packages, onOpenChange, onViewDetails } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Comparacion de paquetes</DialogTitle>
          <DialogDescription>Revisa los datos principales de cada opcion antes de continuar.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="rounded-xl border border-border p-4 space-y-3">
              <p className="font-bold text-lg text-foreground">{pkg.name}</p>
              <p className="text-sm text-muted-foreground">{getPackageDestination(pkg)}</p>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">Precio:</span> S/{pkg.pricePersona}</p>
                <p><span className="font-semibold">Duracion:</span> {pkg.days} {pkg.days === 1 ? "dia" : "dias"}</p>
                <p><span className="font-semibold">Minimo:</span> {pkg.minStudents} estudiantes</p>
              </div>
              <Button className="w-full" onClick={() => onViewDetails(pkg)}>Ver detalles</Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackagesCompareModal;
