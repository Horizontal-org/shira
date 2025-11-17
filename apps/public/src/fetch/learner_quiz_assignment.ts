import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export type AssignQuizResponse = {
  spaceName: string;
};

export type ErrorResponse = {
  httpStatus?: number;
  code?: string;
  message?: string;
  details?: unknown;
};

export function assignQuizError(err: unknown): ErrorResponse {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<any>;
    const httpStatus = ax.response?.status;
    const payload = ax.response?.data;

    const code = payload.statusCode;
    const message = payload?.message || ax.message || "";

    return { httpStatus, code, message, details: payload };
  }
}

export async function assignQuiz(token: string): Promise<AssignQuizResponse> {
  const { data } = await api.post<AssignQuizResponse>(
    `/learners/assignments/${encodeURIComponent(token)}`
  );
  return data;
}
