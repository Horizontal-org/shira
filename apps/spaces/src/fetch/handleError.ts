import axios from "axios";

export type ErrorResponse = {
  httpStatus?: number;
  code?: string;
  message?: string;
  details?: unknown;
};

export function handleHttpError(err: unknown): ErrorResponse {
  if (axios.isAxiosError(err) && err.response) {
    const { status, data } = err.response as { status: number; data?: any };

    const code = data?.code ?? data?.statusCode;
    const message =
      (Array.isArray(data?.message) ? data.message[0] : data?.message) ??
      err.message ??
      "unknown_error";

    return { httpStatus: status, code, message, details: data };
  }

  return {
    httpStatus: undefined,
    code: "unknown_error",
    message: err instanceof Error ? err.message : "unknown_error",
    details: err
  };
}
