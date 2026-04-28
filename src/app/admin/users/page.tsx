import type { Metadata } from "next";

import UsersView from "@/components/admin/users/usersView";

export const metadata: Metadata = {
  title: "Usuarios | GoPromo Admin",
  description: "Control de usuarios, roles y datos de registro.",
};

const AdminUsersPage = () => {
  return <UsersView />;
};

export default AdminUsersPage;
