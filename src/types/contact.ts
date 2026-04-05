export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface CreateContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
