import axios from 'axios';

interface InviteOrgRequest {
  slug: string;
  email: string;
  orgType: string;
}

interface ConfirmRegistrationPayload {
  passphrase: string;
  email: string;
  password: string;
}

export const inviteOrg = async (payload: InviteOrgRequest) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/invitation`, payload)
}

export const checkPassphraseExpired = async (code: string) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/passphrase/${code}/check-expired`)
  return data
}

export const registerSpace = async (payload: ConfirmRegistrationPayload) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/space-registration`, payload)
}