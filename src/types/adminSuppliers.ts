import type { AdminSupplier } from "@/types/adminViews";

export type SupplierListItem = {
  id: number;
  companyName: string;
  email: string;
  ruc: string;
  phone: string;
  active: boolean;
  verified: boolean;
  createdAt: string;
};

export type SupplierDetails = {
  id: number;
  companyName: string;
  email: string;
  ruc: string;
  representativeName: string;
  phone: string;
  active: boolean;
  verified: boolean;
  createdAt: string;
};

export type SuppliersApiListResponse = {
  data: SupplierListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type SupplierDetailsMap = Map<number, SupplierDetails>;

export function mapSupplierFromApi(
  supplier: SupplierListItem,
  detailsById: SupplierDetailsMap,
): AdminSupplier {
  return {
    id: supplier.id,
    companyName: supplier.companyName,
    ruc: supplier.ruc,
    representativeName: detailsById.get(supplier.id)?.representativeName ?? "-",
    email: supplier.email,
    phone: supplier.phone,
    createdAt: supplier.createdAt,
    verified: supplier.verified,
    active: supplier.active,
  };
}
