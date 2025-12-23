import axios from 'axios';

interface InviteOrgRequest {
  slug: string;
  email: string;
  orgType: string;
}

export const inviteOrg = async (payload: InviteOrgRequest) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/invitation`, payload)
}
