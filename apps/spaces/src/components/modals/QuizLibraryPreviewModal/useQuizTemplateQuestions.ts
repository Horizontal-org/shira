import { useEffect, useState } from "react";
import {
  type LibraryQuizDto,
} from "../../../fetch/quiz_templates";
import {
  getQuizTemplateQuestions,
  LibraryQuizQuestionTemplateDto
} from "../../../fetch/quiz_templates";
import { usePreviewQuestionSelection } from "../PreviewModal/usePreviewQuestionSelection";
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
  const {
    previewQuestion,
    openPreviewQuestion,
    closePreviewQuestion,
  } = usePreviewQuestionSelection(questions);

  useEffect(() => {
    if (!isOpen || quizId === null) {
      setQuestions([]);
      setHasLoadedQuestions(false);
      setIsLoadingQuestions(false);
      setHasQuestionLoadError(false);
      closePreviewQuestion();
      return;
    }

    setQuestions([]);
    setHasLoadedQuestions(false);
    setIsLoadingQuestions(true);
    setHasQuestionLoadError(false);
    closePreviewQuestion();

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
  }, [isOpen, quizId, closePreviewQuestion]);

  const updateQuestionApp = (questionId: number, appName: string) => {
    setQuestions((currentQuestions) => currentQuestions.map((question) => {
      if (question.questionId !== questionId || !question.appType) {
        return question;
      }

      const selectedApp = getAppsByTypeAndValue(question.appType, appName);
      return selectedApp ? { ...question, appName: selectedApp.name } : question;
    }));
  };

  const firstPreviewableQuestion = questions.find((question) => question.content.trim());

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
