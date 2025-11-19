import axios from 'axios';

export const invite = async (email: string, name: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/learners/invitations`, {
    email, name
  })
  return data;
}

export const assignToQuiz = async (email: string, quizId: number) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/learners/assignments`, {
    email, quizId
  })
  return data;
}