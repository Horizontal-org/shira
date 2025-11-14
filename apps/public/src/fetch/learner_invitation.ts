import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const acceptInvitation = async (token: string) => {
  return await axios.post(`${API}/learners/invitations/${encodeURI(token)}/accept`);
};
