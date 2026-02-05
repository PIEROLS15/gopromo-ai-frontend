export type ValidationIssue = {
  message: string;
  path: PropertyKey[];
};

export type ValidationError = {
  issues: ValidationIssue[];
};

export type SafeParseResult<TData> =
  | { success: true; data: TData }
  | { success: false; error: ValidationError };

export type Schema<TData> = {
  safeParse: (data: unknown) => SafeParseResult<TData>;
};

export type ValidationResult<TData> = {
  data: TData | null;
  fieldErrors: Record<string, string>;
  firstError: string | null;
};

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return fallback;
};

export const getFieldErrors = (issues: ValidationIssue[]) => {
  const fieldErrors: Record<string, string> = {};
  issues.forEach((err) => {
    const field = err.path[0];
    if (field) {
      fieldErrors[field as string] = err.message;
    }
  });
  return fieldErrors;
};

export const validateForm = <TData,>(
  schema: Schema<TData>,
  data: unknown
): ValidationResult<TData> => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      data: null,
      fieldErrors: getFieldErrors(result.error.issues),
      firstError: result.error.issues[0]?.message ?? null,
    };
  }

  return {
    data: result.data as TData,
    fieldErrors: {},
    firstError: null,
  };
};
