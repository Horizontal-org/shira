import axios from 'axios';

export const inviteLearner = async (name: string, email: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/learners/invitations`, {
    email, name
  })
  return data;
}

export const deleteLearners = async (ids: number[]) => {
  const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/learners/delete`, {
    data: { ids }
  })
  return data;
}

export interface AssignRequest {
  learnerId: number;
  quizId: number;
}

export const assignToQuiz = async (learners: AssignRequest[]) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/learners/assignments`, {
    learners
  })
  return response;
}