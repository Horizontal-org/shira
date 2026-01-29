import axios from 'axios';

export const requestPasswordReset = async (email: string) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, {
    email,
  });
};

export const confirmPasswordReset = async (token: string, password: string) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/reset-password/confirm`, {
    token,
    password,
  });
};
