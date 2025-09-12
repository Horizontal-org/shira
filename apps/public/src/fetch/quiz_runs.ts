import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export type Answer = 'is_legitimate' | 'is_phishing' | 'dont_know';

export type QuestionRunPayload = {
  questionId: number;
  answer: Answer;
  answeredAt: string;
};

export type FinishPayload = {
  finishedAt: string;
  questionRuns: QuestionRunPayload[];
};

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
  const { data } = await axios.post<QuizRun>(`${API}/quiz-runs`, payload);
  console.log("startQuizRun response data:", data);
  return data;
};

export const finishQuizRun = (runId: number, payload: FinishPayload) =>
  axios.patch(`${API}/quiz-runs/${runId}/finish`, payload);

export const saveQuestionRun = (runId: number, qr: QuestionRunPayload) =>
  axios.post(`${API}/quiz-runs/${runId}/question-runs`, qr);
