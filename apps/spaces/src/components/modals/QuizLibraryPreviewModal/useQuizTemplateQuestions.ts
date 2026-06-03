import { useEffect, useMemo, useState } from "react";
import {
  getQuizTemplateQuestions,
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../../../fetch/quiz_templates";
import { getAppsByType } from "../../../utils/appNames";

export const useQuizTemplateQuestions = (
  quiz: LibraryQuizDto | null,
  isOpen: boolean,
) => {
  const [questions, setQuestions] = useState<LibraryQuizQuestionTemplateDto[]>([]);
  const [hasLoadedQuestions, setHasLoadedQuestions] = useState(false);
  const [previewQuestionId, setPreviewQuestionId] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen || !quiz) {
      setQuestions([]);
      setHasLoadedQuestions(false);
      setPreviewQuestionId(null);
      return;
    }

    let isCancelled = false;

    const loadQuestions = async () => {
      const loadedQuestions = await getQuizTemplateQuestions(quiz.id);

      if (!isCancelled) {
        setQuestions(loadedQuestions ?? []);
        setHasLoadedQuestions(true);
      }
    };

    loadQuestions();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, quiz]);

  const previewQuestion = useMemo(
    () => questions.find((question) => question.questionId === previewQuestionId) ?? null,
    [previewQuestionId, questions],
  );

  const firstPreviewableQuestion = useMemo(
    () => questions.find((question) => question.content.trim()),
    [questions],
  );

  const openPreviewQuestion = (questionId: number) => {
    setPreviewQuestionId(questionId);
  };

  const closePreviewQuestion = () => {
    setPreviewQuestionId(null);
  };

  const updateQuestionApp = (questionId: number, appId: number) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) => {
        if (question.questionId !== questionId || !question.appType) {
          return question;
        }

        const selectedApp = getAppsByType(question.appType).find(
          (appOption) => appOption.id === appId,
        );

        if (!selectedApp) {
          return question;
        }

        return {
          ...question,
          appName: selectedApp.name,
        };
      }),
    );
  };

  return {
    questions,
    hasLoadedQuestions,
    previewQuestion,
    firstPreviewableQuestion,
    openPreviewQuestion,
    closePreviewQuestion,
    updateQuestionApp,
  };
};
