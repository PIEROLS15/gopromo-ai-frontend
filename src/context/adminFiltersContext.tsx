"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type {
  SuppliersActiveFilter,
  SuppliersVerificationFilter,
} from "@/types/adminViews";

type AdminFiltersContextType = {
  packagesSearch: string;
  setPackagesSearch: (value: string) => void;
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
      suppliersSearch,
      suppliersVerifiedFilter,
      suppliersActiveFilter,
      usersSearch,
      usersRoleFilter,
      bookingStatus,
      paymentStatus,
      setPackagesSearch,
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
