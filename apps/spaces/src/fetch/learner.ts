import axios from 'axios';

export const invite = async (name: string, email: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/learners/invitations`, {
    email, name
  })
  return data;
}

export interface AssignRequest {
  learnerId: number;
  email: string;
  quizId: number;
}

export const assignToQuiz = async (learners: AssignRequest[]) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/learners/assignments`, {
    learners
  })
  return response;
}