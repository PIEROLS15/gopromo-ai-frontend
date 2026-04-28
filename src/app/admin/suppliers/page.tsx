import type { Metadata } from "next";

import SuppliersView from "@/components/admin/suppliers/suppliersView";

export const metadata: Metadata = {
  title: "Proveedores | GoPromo Admin",
  description: "Revision de proveedores, verificacion y estado operacional.",
};

const AdminSuppliersPage = () => {
  return <SuppliersView />;
};

export default AdminSuppliersPage;
