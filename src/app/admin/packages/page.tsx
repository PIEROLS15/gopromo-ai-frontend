import type { Metadata } from "next";

import PackagesView from "@/components/admin/packages/packagesView";

export const metadata: Metadata = {
  title: "Paquetes | GoPromo Admin",
  description: "Gestion de paquetes turisticos, visibilidad y mantenimiento del catalogo.",
};

const AdminPackagesPage = () => {
  return <PackagesView />;
};

export default AdminPackagesPage;
