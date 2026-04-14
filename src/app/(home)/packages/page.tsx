import type { Metadata } from "next";

import PackagesView from "@/components/home/packages/packagesView";

export const metadata: Metadata = {
  title: "Paquetes Turisticos | PromoTrip AI",
  description:
    "Explora paquetes turisticos educativos para instituciones de Canete con proveedores verificados.",
};

const PackagesPage = () => {
  return <PackagesView />;
};

export default PackagesPage;
