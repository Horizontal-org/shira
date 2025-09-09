import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export type Answer = 'is_legitimate' | 'is_phishing' | 'dont_know';

export interface QuestionRunDraft {
  questionId: number;
  answer: Answer;
  answeredAt: string;
}

export interface QuizRun {
  id: number | string;
  quizId: number | string;
  learnerId?: string | null;
  startedAt: string;
  finishedAt?: string | null;
}

export const startQuizRun = async (payload: {
  quizId: number | string;
  learnerId?: string | null;
  startedAt: string;
}) => {
  const { data } = await axios.post<QuizRun>(`${API}/quiz/run`, payload);
  return data;
};

export const finishQuizRun = async (
  runId: number | string,
  payload: {
    finishedAt: string;
    questionRuns: QuestionRunDraft[];
  }
) => {
  const { data } = await axios.patch<QuizRun>(`${API}/quiz/run/${runId}`, payload);
  return data;
};
