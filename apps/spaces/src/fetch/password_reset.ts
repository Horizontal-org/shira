import axios from 'axios';

export const requestPasswordReset = async (email: string) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, {
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
  await axios.post(`${process.env.REACT_APP_API_URL}/reset-password/confirm/${token}`, {
    ...payload,
  });
};

export const validatePasswordResetToken = async (token: string) => {
  await axios.get(`${process.env.REACT_APP_API_URL}/reset-password/validate/${token}`);
};
