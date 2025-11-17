import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export type AcceptInvitationResponse = {
  spaceName: string;
};

export type Error = {
  httpStatus?: number;
  code?: string;
  message?: string;
  details?: unknown;
};

export function acceptInvitationError(err: unknown): Error {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<any>;
    const httpStatus = ax.response?.status;
    const payload = ax.response?.data;

    const code = payload?.code || payload?.error || payload?.statusCode;
    const message =
      payload?.message ||
      ax.message ||
      (httpStatus ? `HTTP ${httpStatus}` : "Unknown error");

    return { httpStatus, code, message, details: payload };
  }

}

export async function acceptInvitation(token: string): Promise<AcceptInvitationResponse> {
  const { data } = await api.post<AcceptInvitationResponse>(
    `/learners/invitations/${encodeURIComponent(token)}/accept`
  );
  return data;
}
