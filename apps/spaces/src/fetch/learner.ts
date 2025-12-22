import axios from 'axios';

export const inviteLearner = async (name: string, email: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/learners/invitations`, {
    email, name
  })
  return data;
}

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