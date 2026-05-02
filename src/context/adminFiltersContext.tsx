"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type {
  PackagesActiveFilter,
  SuppliersActiveFilter,
  SuppliersVerificationFilter,
} from "@/types/adminViews";

type AdminFiltersContextType = {
  packagesSearch: string;
  setPackagesSearch: (value: string) => void;
  packagesActiveFilter: PackagesActiveFilter;
  setPackagesActiveFilter: (value: PackagesActiveFilter) => void;
  packagesDepartmentFilter: string;
  setPackagesDepartmentFilter: (value: string) => void;
  packagesProvinceFilter: string;
  setPackagesProvinceFilter: (value: string) => void;
  packagesDistrictFilter: string;
  setPackagesDistrictFilter: (value: string) => void;
  suppliersSearch: string;
  setSuppliersSearch: (value: string) => void;
  suppliersVerifiedFilter: SuppliersVerificationFilter;
  setSuppliersVerifiedFilter: (value: SuppliersVerificationFilter) => void;
  suppliersActiveFilter: SuppliersActiveFilter;
  setSuppliersActiveFilter: (value: SuppliersActiveFilter) => void;
  usersSearch: string;
  setUsersSearch: (value: string) => void;
  usersRoleFilter: string;
  setUsersRoleFilter: (value: string) => void;
  bookingStatus: string;
  setBookingStatus: (value: string) => void;
  paymentStatus: string;
  setPaymentStatus: (value: string) => void;
};

const AdminFiltersContext = createContext<AdminFiltersContextType | undefined>(undefined);

export const AdminFiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [packagesSearch, setPackagesSearch] = useState("");
  const [packagesActiveFilter, setPackagesActiveFilter] = useState<PackagesActiveFilter>("all");
  const [packagesDepartmentFilter, setPackagesDepartmentFilter] = useState("all");
  const [packagesProvinceFilter, setPackagesProvinceFilter] = useState("all");
  const [packagesDistrictFilter, setPackagesDistrictFilter] = useState("all");
  const [suppliersSearch, setSuppliersSearch] = useState("");
  const [suppliersVerifiedFilter, setSuppliersVerifiedFilter] =
    useState<SuppliersVerificationFilter>("all");
  const [suppliersActiveFilter, setSuppliersActiveFilter] =
    useState<SuppliersActiveFilter>("all");
  const [usersSearch, setUsersSearch] = useState("");
  const [usersRoleFilter, setUsersRoleFilter] = useState("all");
  const [bookingStatus, setBookingStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");

  const value = useMemo(
    () => ({
      packagesSearch,
      setPackagesSearch,
      packagesActiveFilter,
      setPackagesActiveFilter,
      packagesDepartmentFilter,
      setPackagesDepartmentFilter,
      packagesProvinceFilter,
      setPackagesProvinceFilter,
      packagesDistrictFilter,
      setPackagesDistrictFilter,
      suppliersSearch,
      setSuppliersSearch,
      suppliersVerifiedFilter,
      setSuppliersVerifiedFilter,
      suppliersActiveFilter,
      setSuppliersActiveFilter,
      usersSearch,
      setUsersSearch,
      usersRoleFilter,
      setUsersRoleFilter,
      bookingStatus,
      setBookingStatus,
      paymentStatus,
      setPaymentStatus,
    }),
    [
      packagesSearch,
      packagesActiveFilter,
      packagesDepartmentFilter,
      packagesProvinceFilter,
      packagesDistrictFilter,
      suppliersSearch,
      suppliersVerifiedFilter,
      suppliersActiveFilter,
      usersSearch,
      usersRoleFilter,
      bookingStatus,
      paymentStatus,
      setPackagesSearch,
      setPackagesActiveFilter,
      setPackagesDepartmentFilter,
      setPackagesProvinceFilter,
      setPackagesDistrictFilter,
      setSuppliersSearch,
      setSuppliersVerifiedFilter,
      setSuppliersActiveFilter,
      setUsersSearch,
      setUsersRoleFilter,
      setBookingStatus,
      setPaymentStatus,
    ],
  );

  return (
    <AdminFiltersContext.Provider value={value}>{children}</AdminFiltersContext.Provider>
  );
};

export const useAdminFilters = () => {
  const context = useContext(AdminFiltersContext);

  if (!context) {
    throw new Error("useAdminFilters must be used within AdminFiltersProvider");
  }

  return context;
};
