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

export interface ExplanationDto {
  position: number;
  text: string;
  index: number;
};

export interface QuestionToDuplicate {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  content: string;
  language: Language;
  app: App;
  explanations: ExplanationDto[];
};

export type LanguageDto = {
  id: number;
  name: string;
  content: string;
  explanations: ExplanationDto[];
};

export type QuestionLibraryDto = {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  apps: App[];
  languages: LanguageDto[];
};


export const getLibraryQuestions = async () => {
  try {
    const { data } = await axios.get<QuestionLibraryDto>(`${process.env.REACT_APP_API_URL}/question/library`);
    return data;
  } catch (err) {
    console.log("🚀 ~ getLibraryQuestions ~ err:", err);
  }
};

export const useLibraryQuestionCRUD = () => {

  const [actionFeedback, handleActionFeedback] = useState(null);

  const duplicate = async (quizId: number, questionId: number, languageId: number, appId: number) => {
    console.log("🚀 ~ duplicate ~ quizId, questionId, languageId, appId:", quizId, questionId, languageId, appId);
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

export enum LibraryQuestionFeedback {
  Processing = 'PROCESSING',
  Error = 'ERROR',
  Success = 'SUCCESS',
};
