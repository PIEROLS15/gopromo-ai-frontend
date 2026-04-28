import {
  Building2,
  Calendar,
  CreditCard,
  Package,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { apiFetch } from "@/services/api";
import {
  ADMIN_USERS_FETCH_LIMIT,
  normalizeAdminRoleName,
} from "@/lib/admin/users";
import {
  mapSupplierFromApi,
  type SupplierDetailsMap,
  type SuppliersApiListResponse,
} from "@/types/adminSuppliers";
import {
  mapUserFromApi,
  type UsersApiListResponse,
} from "@/types/adminUsers";
import type { TourPackageListResponse } from "@/types/tourPackage";
import type {
  AdminPackage,
  AdminSupplier,
  AdminSnapshot,
  AdminUserRow,
  DashboardRole,
  DashboardStat,
} from "@/types/adminViews";

function mapPackage(item: TourPackageListResponse["data"][number]): AdminPackage {
  return {
    id: item.id,
    name: item.name,
    destination: [
      item.district.name,
      item.district.province.name,
      item.district.province.department.name,
    ].join(", "),
    providerName: item.supplier.companyName,
    price: item.pricePersona,
    active: item.active,
  };
}

async function getTourPackages(): Promise<AdminPackage[]> {
  const [activeResponse, inactiveResponse] = await Promise.all([
    apiFetch<TourPackageListResponse>("/api/v1/tour-packages?page=1&limit=100&active=true"),
    apiFetch<TourPackageListResponse>("/api/v1/tour-packages?page=1&limit=100&active=false"),
  ]);

  const merged = [...activeResponse.data, ...inactiveResponse.data];
  const unique = new Map<number, TourPackageListResponse["data"][number]>();

  merged.forEach((item) => {
    unique.set(item.id, item);
  });

  return Array.from(unique.values()).map(mapPackage);
}

async function getSuppliers(): Promise<AdminSupplier[]> {
  const [activeResponse, inactiveResponse] = await Promise.all([
    apiFetch<SuppliersApiListResponse>("/api/v1/suppliers?page=1&limit=100&active=true"),
    apiFetch<SuppliersApiListResponse>("/api/v1/suppliers?page=1&limit=100&active=false"),
  ]);

  const merged = [...activeResponse.data, ...inactiveResponse.data];
  const unique = new Map<number, SuppliersApiListResponse["data"][number]>();

  merged.forEach((item) => {
    unique.set(item.id, item);
  });

  const emptyDetails: SupplierDetailsMap = new Map();
  return Array.from(unique.values()).map((item) => mapSupplierFromApi(item, emptyDetails));
}

async function getUsers(): Promise<AdminUserRow[]> {
  const response = await apiFetch<UsersApiListResponse>(
    `/api/v1/users?page=1&limit=${ADMIN_USERS_FETCH_LIMIT}`,
  );

  return response.data.map((user) => mapUserFromApi(user, normalizeAdminRoleName(user.role.name)));
}

const AdminDataService = {
  getSnapshot: async (role: DashboardRole | null): Promise<AdminSnapshot> => {
    const packagesPromise = getTourPackages();

    if (role === "Admin") {
      const [packagesResult, suppliersResult, usersResult] = await Promise.allSettled([
        packagesPromise,
        getSuppliers(),
        getUsers(),
      ]);

      const packages = packagesResult.status === "fulfilled" ? packagesResult.value : [];
      const suppliers = suppliersResult.status === "fulfilled" ? suppliersResult.value : [];
      const users = usersResult.status === "fulfilled" ? usersResult.value : [];

      return {
        packages,
        suppliers,
        bookings: [],
        users,
        payments: [],
        settings: [],
      };
    }

    const packages = await packagesPromise;

    return {
      packages,
      suppliers: [],
      bookings: [],
      users: [],
      payments: [],
      settings: [],
    };
  },
  getDashboardStats: (role: DashboardRole | null, snapshot: AdminSnapshot): DashboardStat[] => {
    const confirmed = snapshot.bookings.filter((item) => item.status === "Confirmada").length;
    const paidTotal = snapshot.payments
      .filter((item) => item.status === "Pagado")
      .reduce((total, item) => total + item.amount, 0);
    const verifiedSuppliers = snapshot.suppliers.filter((item) => item.verified).length;
    const activePackages = snapshot.packages.filter((item) => item.active).length;

    if (role === "Supplier") {
      const supplier = snapshot.suppliers[0];
      const supplierStatus = supplier
        ? supplier.verified
          ? "Verificado"
          : "Pendiente"
        : "Sin datos";
      const supplierStatusDescription = supplier
        ? supplier.verified
          ? "Operando con normalidad"
          : "En proceso de verificacion"
        : "Sin informacion disponible";

      return [
        {
          id: "supplier-packages",
          label: "Mis paquetes",
          value: String(snapshot.packages.length),
          description: `${activePackages} activos`,
          icon: Package,
          colorClass: "text-primary",
        },
        {
          id: "supplier-bookings",
          label: "Reservas",
          value: String(snapshot.bookings.length),
          description: `${confirmed} confirmadas`,
          icon: Calendar,
          colorClass: "text-emerald-500",
        },
        {
          id: "supplier-billing",
          label: "Ingresos registrados",
          value: `S/${paidTotal.toLocaleString("es-PE")}`,
          description: "Pagos conciliados",
          icon: CreditCard,
          colorClass: "text-sky-500",
        },
        {
          id: "supplier-verification",
          label: "Estado del proveedor",
          value: supplierStatus,
          description: supplierStatusDescription,
          icon: ShieldCheck,
          colorClass: "text-amber-500",
        },
      ];
    }

    return [
      {
        id: "admin-bookings",
        label: "Reservas totales",
        value: String(snapshot.bookings.length),
        description: `${confirmed} confirmadas`,
        icon: Calendar,
        colorClass: "text-primary",
      },
      {
        id: "admin-revenue",
        label: "Ingresos totales",
        value: `S/${paidTotal.toLocaleString("es-PE")}`,
        description: "Pagos exitosos",
        icon: TrendingUp,
        colorClass: "text-emerald-500",
      },
      {
        id: "admin-suppliers",
        label: "Proveedores verificados",
        value: String(verifiedSuppliers),
        description: `${snapshot.suppliers.length - verifiedSuppliers} pendientes`,
        icon: Building2,
        colorClass: "text-sky-500",
      },
      {
        id: "admin-packages",
        label: "Paquetes activos",
        value: String(activePackages),
        description: `${snapshot.packages.length} en catalogo`,
        icon: Package,
        colorClass: "text-amber-500",
      },
    ];
  },
};

export function formatAdminDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default AdminDataService;
