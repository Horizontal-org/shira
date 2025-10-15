import axios from 'axios';
import { useState } from 'react';

export interface App {
  name: string;
  id?: number;
  type?: string;
}

export interface Language {
  id: number;
  name: string;
}

export interface Explanation {
  position: number;
  text: string;
  index: number;
};

export interface Question {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  content: string;
  language: Language;
  app: App;
  explanations: Explanation[];
};

export const getLibraryQuestions = async () => {
  try {
    const { data } = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question/library`);
    return keepFirstAppPerQuestionLanguage(data);
  } catch (err) {
    console.log("🚀 ~ getLibraryQuestions ~ err:", err);
  }
};

export const useLibraryQuestionCRUD = () => {

  const [actionFeedback, handleActionFeedback] = useState(null);

  const duplicate = async (quizId: number, questionId: number, languageId: number, appId: number) => {
    handleActionFeedback(LibraryQuestionFeedback.Processing);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/question/library/${questionId}/duplicate`,
        { quizId, languageId, appId }
      );
      handleActionFeedback(LibraryQuestionFeedback.Success);
      return data;
    } catch (err) {
      handleActionFeedback(LibraryQuestionFeedback.Error);
      console.log("🚀 ~ duplicate ~ err:", err);
    }
  };

  return { actionFeedback, duplicate };
}

function keepFirstAppPerQuestionLanguage(questions: Question[]): Question[] {
  const set = new Set<string>();
  const result: Question[] = [];

  for (const question of questions) {
    const key = `${question.id}::${question.language.id}`;
    if (!set.has(key)) {
      set.add(key);
      result.push(question);
    }
  }

  return result;
};

export enum LibraryQuestionFeedback {
  Processing = 'PROCESSING',
  Error = 'ERROR',
  Success = 'SUCCESS',
};
