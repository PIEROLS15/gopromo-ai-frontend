export interface LoginPayload {
  email: string;
  password: string;
};

export type UserRole = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  email: string;
  fullName: string;
  educationalInstitution: string;
  phone: string;
  avatar: string | null;
  role: UserRole;
};

export type Supplier = {
  id: number;
  email: string;
  ruc: string;
  representativeName: string;
  companyName: string;
  phone: string;
  avatar: string | null;
  active: boolean;
  verified: boolean;
  role: UserRole;
};

export type LoginResponse = {
  user: User | Supplier;
};
