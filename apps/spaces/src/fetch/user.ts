import axios from 'axios';

interface UpdateEmailPayload {
  currentEmail: string;
  newEmail: string;
}

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const updateAuthEmail = async (payload: UpdateEmailPayload) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/user/update/email`, payload);
};

export const updateAuthPassword = async (payload: UpdatePasswordPayload) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/user/update/password`, payload);
};

export const confirmAuthEmailUpdate = async (token: string) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/user/update/email/confirm/${token}`);
};
