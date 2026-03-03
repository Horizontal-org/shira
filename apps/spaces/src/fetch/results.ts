import axios from "axios"

export interface QuizResultsResponse {
  quiz: {
    id: number;
    title: string;
    totalQuestions: number;
  };
  
  metrics: {
    completedCount: number;
    averageScore: number;
    completionRate: string | null;
    byQuestion: {
      questionId: number;
      questionName: string;
      questionContent: string;
      position: number;
      isPhising: number;
      appId: number;
      appName: string;
      totalRuns: string;
      correctCount: string;
    }[];
    byLearner?: {
      learnerId: number;
      learnerName: string;
      learnerEmail: string;
      dateSubmitted: string;
      totalQuestionRuns: string;
      correctCount: string;
    }[] | null;
  };
}

const getQuizResultsFromAPI = async (quizId: number): Promise<QuizResultsResponse> => {
  try {
    const endpoint = `/quiz/${quizId}/results`
    const res = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
    return res.data;
  } catch (err) {
    console.log("🚀 ~ getQuizResults ~ err:", err);
    throw new Error('Failed to fetch quiz results');
  }
};

export const getQuizResults = async (quizId: number): Promise<QuizResultsResponse> => {  
  return getQuizResultsFromAPI(quizId);
};