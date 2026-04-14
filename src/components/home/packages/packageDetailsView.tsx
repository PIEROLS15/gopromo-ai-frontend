"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import AppBreadcrumb from "@/components/shared/appBreadcrumb";
import { Button } from "@/components/ui/button";
import PackageDetailsGallery from "@/components/home/packages/packageDetailsGallery";
import PackageDetailsHero from "@/components/home/packages/packageDetailsHero";
import PackageDetailsItinerary from "@/components/home/packages/packageDetailsItinerary";
import PackageDetailsLightbox from "@/components/home/packages/packageDetailsLightbox";
import PackageDetailsSafetyCard from "@/components/home/packages/packageDetailsSafetyCard";
import { useTourPackageById } from "@/hooks/useTourPackages";

const formatDestination = (department?: string, province?: string, district?: string) => {
  return [department, province, district].filter(Boolean).join(", ");
};

const PackageDetailsView = () => {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const routeParam = params?.slug;
  const { pkg, loading, error } = useTourPackageById(routeParam);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [itineraryModalOpen, setItineraryModalOpen] = useState(false);

  const images = pkg?.images?.map((item) => item.url).filter(Boolean) ?? [];
  const heroImage = images[0] ?? "/placeholder.jpg";

  const destination = formatDestination(
    pkg?.district?.province?.department?.name,
    pkg?.district?.province?.name,
    pkg?.district?.name
  );

  const availableDays = useMemo(() => {
    if (!pkg?.reservation_days) return [];
    const days = [] as number[];
    if (pkg.reservation_days.sunday) days.push(0);
    if (pkg.reservation_days.monday) days.push(1);
    if (pkg.reservation_days.tuesday) days.push(2);
    if (pkg.reservation_days.wednesday) days.push(3);
    if (pkg.reservation_days.thursday) days.push(4);
    if (pkg.reservation_days.friday) days.push(5);
    if (pkg.reservation_days.saturday) days.push(6);
    return days;
  }, [pkg?.reservation_days]);

  const itineraryDays = pkg?.itinerary?.days ?? [];
  const reservedDates: Date[] = [];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % Math.max(images.length, 1));
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando paquete...</span>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Paquete no encontrado</h1>
          <p className="text-muted-foreground mb-4">El paquete que buscas no existe o no esta disponible.</p>
          <Button onClick={() => router.push("/packages")}>Ver todos los paquetes</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <PackageDetailsLightbox
        open={lightboxOpen}
        images={images}
        currentIndex={lightboxIndex}
        title={pkg.name}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
      />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-3 sm:px-6">
          <AppBreadcrumb
            className="mt-3 mb-4"
            items={[
              { label: "Inicio", href: "/", icon: "home" },
              { label: "Paquetes", href: "/packages" },
              { label: pkg.name },
            ]}
          />

          <PackageDetailsHero
            pkg={pkg}
            destination={destination}
            heroImage={heroImage}
            availableDays={availableDays}
            reservedDates={reservedDates}
            onReserve={() => router.push("/contact")}
          />

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start w-full overflow-hidden">
            <PackageDetailsItinerary
              days={itineraryDays}
              modalOpen={itineraryModalOpen}
              onModalOpenChange={setItineraryModalOpen}
            />

            <div className="flex flex-col gap-5 w-full min-w-0 overflow-hidden">
              <PackageDetailsGallery
                title={pkg.name}
                images={images}
                currentImageIndex={currentImageIndex}
                onCurrentImageIndexChange={setCurrentImageIndex}
                onOpenLightbox={openLightbox}
                onPrevImage={prevImage}
                onNextImage={nextImage}
              />

              <PackageDetailsSafetyCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PackageDetailsView;
