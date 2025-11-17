import axios from "axios";

export type AssignQuizRequest = {
  quizId: number;
  email: string;
};

export const assignQuiz = async (payload: AssignQuizRequest): Promise<void> => {
  const { data } = await axios.post<void>(
    `${process.env.REACT_APP_API_URL}/learners/assignments/`,
    payload
  );
  return data;
};
