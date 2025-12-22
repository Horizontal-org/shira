import axios from "axios";

export type AcceptInvitationResponse = {
  spaceName: string;
};

export const acceptInvitation = async (token: string): Promise<AcceptInvitationResponse> => {
  const { data } = await axios.post<AcceptInvitationResponse>(
    `${process.env.REACT_APP_API_URL}/learners/invitations/${encodeURIComponent(token)}/accept`
  );
  return data;
}
