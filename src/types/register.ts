export interface PublicRegisterPayload {
  email: string;
  fullName: string;
  educationalInstitution?: string | null;
  phone?: string | null;
  password: string;
  roleId: 2;
}

export interface ProviderRegisterPayload {
  email: string;
  ruc: string;
  representativeName: string;
  companyName: string;
  phone: string;
  password: string;
  roleId: 3;
}

export type RegisterRole = {
  id: number;
  name: string;
};

export type RegisteredSupplier = {
  id: number;
  email: string;
  ruc: string;
  representativeName: string;
  companyName: string;
  phone: string;
  password: string;
  resetPasswordToken: string | null;
  avatar: string | null;
  roleId: number;
  active: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  role: RegisterRole;
};

export type RegisteredUser = {
  id: number;
  email: string;
  fullName: string;
  educationalInstitution: string | null;
  phone: string | null;
  password: string;
  resetPasswordToken: string | null;
  avatar: string | null;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role: RegisterRole;
};

export type PublicRegisterResponse = {
  user: RegisteredUser;
};

export type SupplierRegisterResponse = {
  supplier: RegisteredSupplier;
};
