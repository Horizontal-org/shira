import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const acceptInvitation = async (token: string): Promise<void> => {
  await axios.post<void>(`${API}/learners/invitations/${encodeURI(token)}/accept`);
};
