import type { Metadata } from "next";

import PackageDetailsView from "@/components/home/packages/packageDetailsView";

export const metadata: Metadata = {
  title: "Detalle de paquete | GoPromo AI",
  description: "Consulta informacion detallada del paquete turistico, itinerario y servicios incluidos.",
};

const PackageDetailPage = () => {
  return <PackageDetailsView />;
};

export default PackageDetailPage;
