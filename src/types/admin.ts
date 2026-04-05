export type AdminRole = "Admin" | "Supplier";

export interface AdminRouteRule {
  prefix: string;
  roles: AdminRole[];
}

export interface MeResponse {
  data?: {
    user?: {
      role?: {
        name?: string;
      };
    };
  };
}
