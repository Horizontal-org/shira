import axios from 'axios';

export type BulkStatus = "OK" | "Error" | "Skipped";

export type BulkLearnerRowResult = {
  row: number;
  email: string;
  name?: string;
  status: BulkStatus;
  message?: string[];
};

export type BulkInviteLearnersResponse = BulkLearnerRowResult[];

export type BulkInviteValidatedLearner = {
  row: number;
  email: string;
  name: string;
};

export const inviteLearner = async (name: string, email: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/learners/invitations`, {
    email, name
  })
  return data;
}

export const inviteLearnersBulk = async (learners: BulkInviteValidatedLearner[]) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/learners/invitations/bulk/send`,
    { learners }
  );

  return data as BulkInviteLearnersResponse;
};

export const verifyLearnersBulk = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/learners/invitations/bulk/verify`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data as BulkInviteLearnersResponse;
};

export const deleteLearners = async (ids: number[]) => {
  const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/learners`, {
    data: { ids }
  })
  return data;
}

export const fetchLearners = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learners`)
  return data;
}
