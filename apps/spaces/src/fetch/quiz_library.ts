import axios from "axios";

export interface LibraryQuizQuestionDto {
  id?: number | string;
  title?: string;
  isPhishing?: boolean;
  type?: string;
  languageName?: string;
  appName?: string;
}

export interface LibraryQuizDto {
  id?: number | string;
  title: string;
  createdAt: string;
  author: string;
  languages: string[];
  tags: string[];
  questions?: LibraryQuizQuestionDto[];
}

export const getQuizTemplates = async (): Promise<LibraryQuizDto[]> => {
  try {
    const res = await axios.get<LibraryQuizDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`
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
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}`
    );

    return res.data;
  } catch (err) {
    console.error(`Error fetching quiz-template ${quizId}:`, err);
    return null;
  }
};
