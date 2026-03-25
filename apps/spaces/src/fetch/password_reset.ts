import axios from 'axios';

export const requestPasswordReset = async (email: string) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/reset-password`, {
    email,
  });
};

type ConfirmPasswordResetPayload = {
  newPassword: string;
  confirmNewPassword: string;
};

export const confirmPasswordReset = async (
  token: string,
  payload: ConfirmPasswordResetPayload
) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/reset-password/confirm/${token}`, {
    ...payload,
  });
};

export const validatePasswordResetToken = async (token: string) => {
  await axios.get(`${import.meta.env.VITE_API_URL}/reset-password/validate/${token}`);
};
