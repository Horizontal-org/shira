import axios from 'axios';

export interface AssignRequest {
  learnerId: number;
  quizId: number;
}

export const assignToQuiz = async (learners: AssignRequest[]) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/learners/assignments`, { learners }
  );
  return data;
};

export const unassignFromQuiz = async (learners: AssignRequest[]) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_URL}/learners/assignments`, { data: { learners } }
  );
  return data;
};

export const getAssignedLearners = async (quizId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/assignments/${quizId}`)
  return data;
}

export const getUnassignedLearners = async (quizId: number) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/learner-quiz/unassignments/${quizId}`)
  return data;
}
