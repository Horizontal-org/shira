import axios, { AxiosError } from "axios";

export type ErrorResponse = {
  httpStatus?: number;
  code?: string;
  message?: string;
  details?: unknown;
};

export function handleHttpError(err: unknown): ErrorResponse {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<any>;
    const httpStatus = ax.response?.status;
    const payload = ax.response?.data;

    const code = payload.statusCode;
    const message = payload?.message || ax.message || "";

    return { httpStatus, code, message, details: payload };
  }
}