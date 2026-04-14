export type CategoryPackage = {
  id: number;
  name: string;
};

export type CategoryPackageListResponse = {
  data: CategoryPackage[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
