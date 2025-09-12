import axios from "axios"
// for Juan or any other engineer that will implement the backend of results. 
// set the USE_MOCK_DATA to false and replace the endpoint variable with the proper route
// everything should work okay but in case of any issue just ping gus :)
export interface PublicQuizResultsResponse {
  quiz: {
    id: number;
    title: string;
    totalQuestions: number;
  };
  
  metrics: {
    completedCount: number;
    averageScore: number;
  };
}

const USE_MOCK_DATA = true;


// Mock data for empty state
const mockEmptyResults: PublicQuizResultsResponse = {
  quiz: {
    id: 1,
    title: "Email quiz for activists",
    totalQuestions: 8
  },
  metrics: {
    completedCount: 0,
    averageScore: 0
  }
};

// Mock data for filled state
const mockFilledResults: PublicQuizResultsResponse = {
  quiz: {
    id: 1,
    title: "Email quiz for activists", 
    totalQuestions: 8
  },
  metrics: {
    completedCount: 27,
    averageScore: 74.3
  }
};

// Mock function (for development)
const getMockQuizResults = async (quizId: number): Promise<PublicQuizResultsResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(quizId)
  // return mockEmptyResults
  return mockFilledResults;
};

// Real API function (follows same pattern as quiz.ts)
const getQuizResultsFromAPI = async (quizId: number): Promise<PublicQuizResultsResponse> => {
  try {
    const endpoint = `/quiz/${quizId}/results`
    const res = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
    return res.data;
  } catch (err) {
    console.log("🚀 ~ getQuizResults ~ err:", err);
    throw new Error('Failed to fetch quiz results');
  }
};

// Main export function - automatically switches between mock and real API
export const getQuizResults = async (quizId: number): Promise<PublicQuizResultsResponse> => {
  if (USE_MOCK_DATA) {
    return getMockQuizResults(quizId);
  } else {
    return getQuizResultsFromAPI(quizId);
  }
};