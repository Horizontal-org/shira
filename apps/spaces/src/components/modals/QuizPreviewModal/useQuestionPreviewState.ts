import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { getAppsByTypeAndValue } from "../../../utils/appNames";

type PreviewQuestion = {
  questionId: number;
  appName: string | null;
  appType: string;
};

export const useQuestionPreviewState = <T extends PreviewQuestion>(
  setQuestions: Dispatch<SetStateAction<T[]>>,
) => {
  const [previewQuestionId, setPreviewQuestionId] = useState<number | null>(null);

  const openPreviewQuestion = useCallback((questionId: number) => {
    setPreviewQuestionId(questionId);
  }, []);

  const closePreviewQuestion = useCallback(() => {
    setPreviewQuestionId(null);
  }, []);

  const updateQuestionApp = useCallback((questionId: number, appName: string) => {
    setQuestions((currentQuestions) => currentQuestions.map((question) => {
      if (question.questionId !== questionId || !question.appType) {
        return question;
      }

      const selectedApp = getAppsByTypeAndValue(question.appType, appName);

      return selectedApp ? { ...question, appName: selectedApp.name } : question;
    }));
  }, [setQuestions]);

  return {
    previewQuestionId,
    openPreviewQuestion,
    closePreviewQuestion,
    updateQuestionApp,
  };
};
