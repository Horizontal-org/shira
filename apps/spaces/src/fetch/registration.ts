import axios from 'axios';

interface InviteOrgRequest {
  slug: string;
  email: string;
  orgType: string;
  subIntent: string;
  website?: string;
}

interface ConfirmRegistrationPayload {
  passphrase: string;
  email: string;
  password: string;
  website?: string;
}

export const inviteOrg = async (payload: InviteOrgRequest) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/invitation`, payload)
}

export const checkPassphraseExpired = async (code: string) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/passphrase/${code}/check-expired`)
  return data
}

export const registerSpace = async (payload: ConfirmRegistrationPayload) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/space-registration`, payload)
}