import axios from "axios";

export type Invitation = {
  spaceName: string;
};

export const getInvitation = async (token: string): Promise<Invitation> => {
  const { data } = await axios.get<Invitation>(
    `${process.env.REACT_APP_API_URL}/learners/invitations/${encodeURIComponent(token)}`
  );
  return data;
};

export const acceptInvitation = async (token: string): Promise<void> => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/learners/invitations/${encodeURIComponent(token)}/accept`
  );
};
