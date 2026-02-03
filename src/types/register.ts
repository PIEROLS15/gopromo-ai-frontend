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
