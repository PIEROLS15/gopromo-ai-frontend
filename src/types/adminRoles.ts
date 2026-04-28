export type RoleItem = {
  id: number;
  name: string;
};

export type RolesApiListResponse = {
  data: RoleItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
