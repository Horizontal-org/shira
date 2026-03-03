import axios from 'axios';

interface UpdateEmailPayload {
  currentEmail: string;
  newEmail: string;
}

interface UpdatePasswordPayload {
  passphrase: string;
  currentPassword: string;
  newPassword: string;
}

export const updateAuthEmail = async (payload: UpdateEmailPayload) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/space/update/email`, payload);
};

export const updateAuthPassword = async (payload: UpdatePasswordPayload) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/space/update/password`, payload);
};
