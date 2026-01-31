export interface LoginPayload {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    email: string;
    name?: string;
  };
};