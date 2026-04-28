import type {
  AdminSupplier,
  AdminSuppliersMeta,
  SuppliersActiveFilter,
  SuppliersVerificationFilter,
} from "@/types/adminViews";

export const ADMIN_SUPPLIERS_PAGE_SIZE = 10;
export const ADMIN_SUPPLIERS_FETCH_LIMIT = 100;

export function createSuppliersMeta(total: number, page: number, limit: number): AdminSuppliersMeta {
  return {
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export function buildSuppliersQueryParams(params: {
  page: number;
  limit: number;
  activeFilter: SuppliersActiveFilter;
  verifiedFilter: SuppliersVerificationFilter;
}) {
  const query = new URLSearchParams();

  query.set("page", String(params.page));
  query.set("limit", String(params.limit));

  if (params.activeFilter === "active") query.set("active", "true");
  if (params.activeFilter === "inactive") query.set("active", "false");
  if (params.verifiedFilter === "verified") query.set("verified", "true");
  if (params.verifiedFilter === "pending") query.set("verified", "false");

  return query.toString();
}

export function filterSuppliersBySearch(suppliers: AdminSupplier[], rawSearch: string) {
  const normalizedSearch = rawSearch.trim().toLowerCase();

  if (!normalizedSearch) return suppliers;

  return suppliers.filter((supplier) => {
    return (
      supplier.companyName.toLowerCase().includes(normalizedSearch) ||
      supplier.ruc.includes(normalizedSearch) ||
      supplier.representativeName.toLowerCase().includes(normalizedSearch) ||
      supplier.email.toLowerCase().includes(normalizedSearch)
    );
  });
}

export function paginateSuppliers(suppliers: AdminSupplier[], page: number, limit: number) {
  const meta = createSuppliersMeta(suppliers.length, page, limit);
  const safePage = Math.min(Math.max(1, page), meta.totalPages);

  const from = (safePage - 1) * limit;
  const to = from + limit;

  return {
    data: suppliers.slice(from, to),
    meta: createSuppliersMeta(suppliers.length, safePage, limit),
  };
}

export function getSupplierInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function getSupplierDaysFromDate(dateString: string) {
  const createdAt = new Date(dateString).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - createdAt);
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)));
}
