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

export interface QuestionToDuplicate {
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
    const { data } = await axios.get<QuestionLibraryDto>(`${process.env.REACT_APP_API_URL}/question/library`);
    return data;
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

export type LanguageDto = {
  id: number;
  name: string;
  content: string;
  explanations: Explanation[];
};

export type QuestionLibraryDto = {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;
  app: App;
  language: LanguageDto[];
};

//TODO move to mapper
export function flattenLibraryDto(dtos: QuestionLibraryDto[]): QuestionToDuplicate[] {
  const out: QuestionToDuplicate[] = [];

  for (const q of dtos ?? []) {
    const base = {
      id: q.id,
      name: q.name,
      isPhishing: Boolean(q.isPhishing),
      type: q.type,
      app: q.app ?? { name: '' },
    };

    for (const lang of q.language ?? []) {
      out.push({
        ...base,
        content: lang.content ?? '',
        language: { id: lang.id, name: lang.name },
        explanations: (lang.explanations ?? []).map((e) => ({
          index: Number(e.index ?? 0),
          position: Number(e.position ?? 0),
          text: e.text ?? '',
        })),
      });
    }
  }

  return out;
}

export enum LibraryQuestionFeedback {
  Processing = 'PROCESSING',
  Error = 'ERROR',
  Success = 'SUCCESS',
};
