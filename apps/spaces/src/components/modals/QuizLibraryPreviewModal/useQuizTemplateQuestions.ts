import { useEffect, useState } from "react";
import {
  getQuizTemplateQuestions,
  type LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../../../fetch/quiz_templates";
import { getAppsByTypeAndValue } from "../../../utils/appNames";

export const useQuizTemplateQuestions = (
  quiz: LibraryQuizDto | null,
  isOpen: boolean,
) => {
  const quizId = quiz?.id ?? null;
  const [questions, setQuestions] = useState<LibraryQuizQuestionTemplateDto[]>([]);
  const [hasLoadedQuestions, setHasLoadedQuestions] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [hasQuestionLoadError, setHasQuestionLoadError] = useState(false);
  const [previewQuestionId, setPreviewQuestionId] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen || quizId === null) {
      setQuestions([]);
      setHasLoadedQuestions(false);
      setIsLoadingQuestions(false);
      setHasQuestionLoadError(false);
      setPreviewQuestionId(null);
      return;
    }

    setQuestions([]);
    setHasLoadedQuestions(false);
    setIsLoadingQuestions(true);
    setHasQuestionLoadError(false);
    setPreviewQuestionId(null);

    const loadQuestions = async () => {
      const loadedQuestions = await getQuizTemplateQuestions(quizId);

      if (loadedQuestions === null) {
        setQuestions([]);
        setHasLoadedQuestions(false);
        setHasQuestionLoadError(true);
        setIsLoadingQuestions(false);
        return;
      }

      setQuestions(loadedQuestions);
      setHasLoadedQuestions(true);
      setIsLoadingQuestions(false);
    };

    loadQuestions();
  }, [isOpen, quizId]);

  const previewQuestion = questions.find((question) => question.questionId === previewQuestionId) ?? null;

  const firstPreviewableQuestion = questions.find((question) => question.content.trim());

  const openPreviewQuestion = (questionId: number) => {
    setPreviewQuestionId(questionId);
  };

  const closePreviewQuestion = () => {
    setPreviewQuestionId(null);
  };

  const updateQuestionApp = (questionId: number, appName: string) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) => {
        if (question.questionId !== questionId || !question.appType) {
          return question;
        }

        const selectedApp = getAppsByTypeAndValue(question.appType, appName);

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
    isLoadingQuestions,
    hasQuestionLoadError,
    previewQuestion,
    firstPreviewableQuestion,
    openPreviewQuestion,
    closePreviewQuestion,
    updateQuestionApp,
  };
};
