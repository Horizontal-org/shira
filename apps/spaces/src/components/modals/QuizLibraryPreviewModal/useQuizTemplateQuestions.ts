import { useEffect, useState } from "react";
import {
  type LibraryQuizDto,
} from "../../../fetch/quiz_templates";
import {
  getQuizTemplateQuestions,
  LibraryQuizQuestionTemplateDto
} from "../../../fetch/quiz_templates";
import { useQuestionPreviewState } from "../QuizPreviewModal/useQuestionPreviewState";

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
    previewQuestionId,
    openPreviewQuestion,
    closePreviewQuestion,
    updateQuestionApp,
  } = useQuestionPreviewState(setQuestions);

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

  const previewQuestion = questions.find((question) => question.questionId === previewQuestionId) ?? null;

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
