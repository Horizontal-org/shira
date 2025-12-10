import axios from 'axios';

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

export const unassignFromQuiz = async (learners: AssignRequest[]) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/learners/assignments`, {
    data: { learners }
  })
  return response;
}

export const getAssignedLearners = async (quizId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/assignments/${quizId}`)
  return data
}