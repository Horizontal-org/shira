import axios from "axios";

const AUTHENTICATED_KEY = "shira_authenticated_session";
const EXPIRES_AT_KEY = "shira_session_expires_at";
export const SESSION_EXPIRED_KEY = "shira_session_expired";

let expirationTimer: number | undefined;

const redirectToLogin = () => {
  if (sessionStorage.getItem(AUTHENTICATED_KEY) !== "true") return;

  sessionStorage.removeItem(AUTHENTICATED_KEY);
  sessionStorage.removeItem(EXPIRES_AT_KEY);
  sessionStorage.setItem(SESSION_EXPIRED_KEY, "true");

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

const scheduleExpiration = () => {
  if (expirationTimer !== undefined) window.clearTimeout(expirationTimer);

  const expiresAt = Number(sessionStorage.getItem(EXPIRES_AT_KEY));
  if (!expiresAt) return;

  const remaining = expiresAt - Date.now();
  if (remaining <= 0) {
    redirectToLogin();
    return;
  }

  expirationTimer = window.setTimeout(redirectToLogin, remaining);
};

const getTokenExpiration = (token: string): number | null => {
  try {
    const base64Payload = token.split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const encodedPayload = base64Payload.padEnd(
      base64Payload.length + ((4 - base64Payload.length % 4) % 4),
      "=",
    );
    const payload = JSON.parse(window.atob(encodedPayload));
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const markSessionAuthenticated = (accessToken?: string) => {
  sessionStorage.removeItem(SESSION_EXPIRED_KEY);
  sessionStorage.setItem(AUTHENTICATED_KEY, "true");

  if (accessToken) {
    const expiresAt = getTokenExpiration(accessToken);
    if (expiresAt) sessionStorage.setItem(EXPIRES_AT_KEY, String(expiresAt));
  }

  scheduleExpiration();
};

export const clearAuthenticatedSession = () => {
  if (expirationTimer !== undefined) window.clearTimeout(expirationTimer);
  sessionStorage.removeItem(AUTHENTICATED_KEY);
  sessionStorage.removeItem(EXPIRES_AT_KEY);
  sessionStorage.removeItem(SESSION_EXPIRED_KEY);
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) redirectToLogin();
    return Promise.reject(error);
  },
);

scheduleExpiration();
