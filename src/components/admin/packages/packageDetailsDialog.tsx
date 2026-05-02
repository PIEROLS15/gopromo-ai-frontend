import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  UserRound,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PackageDetailsItinerary from "@/components/home/packages/packageDetailsItinerary";
import type { AdminPackageDetails } from "@/types/adminPackages";

type PackageDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  pkg: AdminPackageDetails | null;
};

const DAYS = [
  { key: "monday", label: "Lun" },
  { key: "tuesday", label: "Mar" },
  { key: "wednesday", label: "Mie" },
  { key: "thursday", label: "Jue" },
  { key: "friday", label: "Vie" },
  { key: "saturday", label: "Sab" },
  { key: "sunday", label: "Dom" },
] as const;

const PackageDetailsDialog = ({
  open,
  onOpenChange,
  loading,
  pkg,
}: PackageDetailsDialogProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [itineraryModalOpen, setItineraryModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setActiveImage(0);
      setItineraryModalOpen(false);
    }
  }, [open, pkg?.id]);

  const images = pkg?.images ?? [];
  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[Math.min(activeImage, images.length - 1)] : null;

  const itineraryDays = pkg?.itineraryDays ?? [];

  const includedServices = useMemo(() => {
    if (!pkg) return [];
    return [
      pkg.services.transport ? "Transporte" : null,
      pkg.services.travel_insurance ? "Seguro de viaje" : null,
      pkg.services.feeding ? "Alimentacion" : null,
      pkg.services.lodging ? "Hospedaje" : null,
    ].filter(Boolean) as string[];
  }, [pkg]);

  const excludedServices = ["Transporte", "Seguro de viaje", "Alimentacion", "Hospedaje"].filter(
    (service) => !includedServices.includes(service),
  );

  const goPrevImage = () => {
    if (!hasImages) return;
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  };

  const goNextImage = () => {
    if (!hasImages) return;
    setActiveImage((current) => (current + 1) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] sm:w-auto max-w-4xl p-0 overflow-hidden border-border bg-card text-foreground max-h-[92vh] sm:max-h-[88vh] rounded-2xl">
        <DialogHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-2 pr-10 sm:pr-12">
          <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight break-words text-center sm:text-left">
            {pkg?.name ?? "Detalles del paquete"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
            <div className="py-12 grid place-items-center">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : pkg ? (
          <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-5 sm:space-y-6 max-h-[80vh] sm:max-h-[78vh] overflow-y-auto">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={pkg.active ? "success" : "destructive"}>{pkg.active ? "Activo" : "Inactivo"}</Badge>
              <Badge variant="orange">{pkg.categoryName}</Badge>
              {pkg.supplierVerified ? <Badge variant="outline">Proveedor verificado</Badge> : null}
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-muted/30 h-[260px] sm:h-[420px]">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 896px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-muted-foreground">Sin imagenes</div>
              )}

              {hasImages ? (
                <>
                  <button
                    type="button"
                    onClick={goPrevImage}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background/70 hover:bg-background/90 border border-border grid place-items-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNextImage}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background/70 hover:bg-background/90 border border-border grid place-items-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 border border-border px-3 py-1 text-xs">
                    {activeImage + 1} / {images.length}
                  </div>
                </>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative shrink-0 h-12 w-16 sm:h-14 sm:w-20 rounded-lg sm:rounded-xl overflow-hidden border ${
                      activeImage === index ? "border-primary" : "border-border"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-2xl bg-muted/40 border border-border p-4">
                <p className="text-sm text-muted-foreground">Precio / persona</p>
                <p className="text-2xl font-bold">S/ {pkg.price.toFixed(2)}</p>
              </div>
              <div className="rounded-2xl bg-muted/40 border border-border p-4">
                <p className="text-sm text-muted-foreground">Duracion</p>
                <p className="text-2xl font-bold">{pkg.days} dia{pkg.days > 1 ? "s" : ""}</p>
              </div>
              <div className="rounded-2xl bg-muted/40 border border-border p-4">
                <p className="text-sm text-muted-foreground">Min. estudiantes</p>
                <p className="text-2xl font-bold">{pkg.minStudents}</p>
              </div>
              <div className="rounded-2xl bg-muted/40 border border-border p-4">
                <p className="text-sm text-muted-foreground">Nivel</p>
                <p className="text-2xl font-bold">{pkg.educationLevelName}</p>
              </div>
            </div>

            <section className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">Informacion general</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-muted-foreground mb-1 flex items-center gap-2"><MapPin className="w-4 h-4" />Ubicacion</p>
                  <p className="font-semibold">{pkg.destination}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-muted-foreground mb-1 flex items-center gap-2"><UserRound className="w-4 h-4" />Proveedor</p>
                  <p className="font-semibold">{pkg.supplierName}</p>
                  {pkg.supplierRuc ? <p className="text-muted-foreground">RUC: {pkg.supplierRuc}</p> : null}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Descripcion</h3>
              <p className="text-muted-foreground leading-relaxed">{pkg.description || "Sin descripcion"}</p>
            </section>

            <section className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-border p-4">
                <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Lo que incluye</p>
                <div className="space-y-2">
                  {includedServices.map((service) => (
                    <p key={service} className="flex items-center gap-2 text-base sm:text-lg text-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{service}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">No incluye</p>
                <div className="space-y-2">
                  {excludedServices.map((service) => (
                    <p key={service} className="flex items-center gap-2 text-base sm:text-lg text-muted-foreground line-through">
                      <X className="w-4 h-4 text-destructive no-underline" />
                      <span>{service}</span>
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">Dias disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => (
                  <Badge
                    key={day.key}
                    variant={pkg.reservationDays[day.key] ? "primary" : "outline"}
                    className="rounded-full"
                  >
                    {day.label}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <PackageDetailsItinerary
                days={itineraryDays}
                modalOpen={itineraryModalOpen}
                onModalOpenChange={setItineraryModalOpen}
                showFullButton={false}
              />
            </section>

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-6">
            <p className="text-sm text-muted-foreground">No se encontro informacion del paquete.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetailsDialog;
