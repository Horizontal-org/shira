import axios from "axios";

export interface LibraryQuizQuestionDto {
  id?: number | string;
  name?: string;
  title?: string;
  questionName?: string;
  isPhishing?: boolean;
  type?: string | boolean;
  language?: string | { name?: string };
  languageName?: string;
  app?: string | { name?: string };
  appName?: string;
}

export interface LibraryQuizDto {
  id?: number | string;
  title: string;
  createdAt: string;
  author: string;
  creator?: string;
  languages: string[];
  tags: string[];
  questionCount?: number;
  totalQuestions?: number;
  questions?: LibraryQuizQuestionDto[];
}

export const getQuizTemplates = async (): Promise<LibraryQuizDto[]> => {
  try {
    const res = await axios.get<LibraryQuizDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsInJvbGVzIjpbInNwYWNlLWFkbWluIl0sImlhdCI6MTc3OTI5ODgxMiwiZXhwIjoxNzc5OTAzNjEyfQ.j13kZcbjK0sBuIyKDKBtF-9wQ8bXS2q7_S-7gePisF8` }
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error fetching quiz-templates:", err);
    return [];
  }
};

export const getQuizTemplate = async (quizId: string | number): Promise<LibraryQuizDto | null> => {
  try {
    const res = await axios.get<LibraryQuizDto>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}`,
      {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsInJvbGVzIjpbInNwYWNlLWFkbWluIl0sImlhdCI6MTc3OTI5ODgxMiwiZXhwIjoxNzc5OTAzNjEyfQ.j13kZcbjK0sBuIyKDKBtF-9wQ8bXS2q7_S-7gePisF8` }
      }
    );

    return res.data;
  } catch (err) {
    console.error(`Error fetching quiz-template ${quizId}:`, err);
    return null;
  }
};
