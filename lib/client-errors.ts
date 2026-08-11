import axios from "axios";

export type ApiFieldErrors = Record<string, string[]>;

interface ApiErrorShape {
  fields?: ApiFieldErrors;
  message?: string;
}

export function extractApiErrors(error: unknown): {
  fields: ApiFieldErrors;
  message?: string;
} | null {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as ApiErrorShape | undefined;
    return {
      fields: data?.fields ?? {},
      message: data?.message,
    };
  }
  return null;
}