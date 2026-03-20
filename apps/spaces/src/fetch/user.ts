import axios from 'axios';

interface ChangeEmailPayload {
  currentEmail: string;
  newEmail: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const requestChangeUserEmail = async (payload: ChangeEmailPayload) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/user/update/email`, payload);
};

export const changeUserPassword = async (payload: ChangePasswordPayload) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/user/update/password`, payload);
};

export const confirmUserEmailChange = async (token: string) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/user/update/email/confirm/${token}`);
};
