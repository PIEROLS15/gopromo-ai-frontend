export type ApiError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export interface ApiSuccessResponse<T> {
  status: "success";
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  errors?: Record<string, string[]>;
}
