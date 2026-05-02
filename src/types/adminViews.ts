import type { LucideIcon } from "lucide-react";

export type DashboardRole = "Admin" | "Supplier";
export type SuppliersVerificationFilter = "all" | "verified" | "pending";
export type SuppliersActiveFilter = "all" | "active" | "inactive";
export type PackagesActiveFilter = "all" | "active" | "inactive";

export type BookingStatus = "Confirmada" | "Pendiente" | "Cancelada";
export type PaymentStatus = "Pagado" | "Pendiente" | "Fallido";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
}

export interface AdminPackage {
  id: number;
  name: string;
  destination: string;
  providerName: string;
  price: number;
  active: boolean;
  categoryName: string;
  educationLevelName: string;
  days: number;
  minStudents: number;
  createdAt: string;
  districtName: string;
  provinceName: string;
  departmentName: string;
}

export interface AdminSupplier {
  id: number;
  companyName: string;
  ruc: string;
  representativeName: string;
  email: string;
  phone: string;
  createdAt: string;
  verified: boolean;
  active: boolean;
}

export interface AdminSuppliersMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminBooking {
  id: number;
  code: string;
  clientName: string;
  travelDate: string;
  peopleCount: number;
  totalAmount: number;
  status: BookingStatus;
}

export interface AdminUserRow {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  roleName: "Admin" | "Supplier" | "User";
  createdAt: string;
}

export interface AdminPayment {
  id: number;
  bookingCode: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  paidAt: string | null;
}

export interface AdminSettingItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface AdminSnapshot {
  packages: AdminPackage[];
  suppliers: AdminSupplier[];
  bookings: AdminBooking[];
  users: AdminUserRow[];
  payments: AdminPayment[];
  settings: AdminSettingItem[];
}
