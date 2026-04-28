import type { Metadata } from "next";

import DashboardView from "@/components/admin/dashboard/dashboardView";

export const metadata: Metadata = {
  title: "Dashboard | GoPromo Admin",
  description: "Vista general de metricas y actividad del panel administrativo.",
};

const AdminDashboardPage = () => {
  return <DashboardView />;
};

export default AdminDashboardPage;
