import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { duplicateQuiz } from "../fetch/quiz";
import { handleHttpError } from "../fetch/handleError";
import { Quiz } from "../store/slices/quiz";
import { hasRequiredValue } from "../utils/validation";
import { getErrorContent } from "../utils/getErrorContent";

type QuizFlowMode = "create" | "duplicate" | null;
type QuizFlowStep = 0 | 1 | 2;
const TITLE_VALIDATION_MIN_LENGTH = 3;
const TITLE_VALIDATION_DELAY_MS = 300;

interface UseQuizCreationFlowParams {
  createQuiz: (title: string, visibility: string) => void;
  fetchQuizzes: () => Promise<void>;
  validateQuizName: (title: string) => Promise<void>;
  t: (key: string, options?: any) => string;
}

export const useQuizCreationFlow = ({
  createQuiz,
  fetchQuizzes,
  validateQuizName,
  t
}: UseQuizCreationFlowParams) => {
  const [mode, setMode] = useState<QuizFlowMode>(null);
  const [step, setStep] = useState<QuizFlowStep>(1);
  const [title, setTitle] = useState("");

  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingTitle, setIsValidatingTitle] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);

  const [submittingQuizId, setSubmittingQuizId] = useState<number | null>(null);
  const titleValidationRequestId = useRef(0);

  const setTitleValidationError = (error: string | null, requestId?: number) => {
    if (requestId !== undefined && titleValidationRequestId.current !== requestId) {
      return;
    }

    setTitleError(error);
  };

  const reset = () => {
    setMode(null);
    setStep(1);
    setTitle("");
    setTitleError(null);
    setSelectedQuizForDuplicate(null);
    setSubmittingQuizId(null);
  };

  const startCreateQuizFlow = () => {
    reset();
    setMode("create");
  };

  const startDuplicateQuizFlow = (quiz: Quiz) => {
    reset();
    setMode("duplicate");
    setSelectedQuizForDuplicate(quiz);
  };

  const validateTitle = async (
    titleToValidate: string,
    requestId?: number
  ) => {
    const trimmedTitle = titleToValidate.trim();

    if (!hasRequiredValue(trimmedTitle)) {
      setTitleValidationError(null, requestId);
      return true;
    }

    try {
      await validateQuizName(trimmedTitle);
      setTitleValidationError(null, requestId);
      return true;
    } catch (e) {
      const error = handleHttpError(e);
      const content = getErrorContent("error_messages", "something_went_wrong", error.message);
      setTitleValidationError(content, requestId);
      return false;
    }
  };

  const handleTitleSubmit = async (newTitle: string) => {
    const trimmedTitle = newTitle.trim();

    if (!hasRequiredValue(trimmedTitle) || isValidatingTitle) return;

    setIsValidatingTitle(true);

    try {
      const isTitleValid = await validateTitle(trimmedTitle);

      if (!isTitleValid) {
        return;
      }

      setTitle(trimmedTitle);
      setStep(2);
    } finally {
      setIsValidatingTitle(false);
    }
  };

  useEffect(() => {
    if (mode === null || step !== 1) {
      return;
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length < TITLE_VALIDATION_MIN_LENGTH) {
      setTitleValidationError(null);
      return;
    }

    const requestId = ++titleValidationRequestId.current;
    const timeoutId = window.setTimeout(async () => {
      setIsValidatingTitle(true);

      try {
        await validateTitle(trimmedTitle, requestId);

        if (titleValidationRequestId.current !== requestId) {
          return;
        }
      } finally {
        if (titleValidationRequestId.current === requestId) {
          setIsValidatingTitle(false);
        }
      }
    }, TITLE_VALIDATION_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [mode, step, title, validateQuizName]);

  const handleBackFromVisibility = () => {
    setStep(1);
  };

  const handleConfirmVisibility = async (visibility: string) => {
    if (!hasRequiredValue(title)) return;

    if (mode === "create") {
      setStep(0);
      await createQuiz(title.trim(), visibility);
      reset();
      return;
    }

    if (mode === "duplicate" && selectedQuizForDuplicate) {
      const quizId = selectedQuizForDuplicate.id;

      setStep(0);
      setIsSubmitting(true);
      setSubmittingQuizId(quizId);

      try {
        await duplicateQuiz(quizId, title.trim(), visibility);

        toast.success(t("success_messages.quiz_duplicated", { quiz_name: title.trim() }), {
          duration: 3000,
        });

        await fetchQuizzes();
      } catch (error) {
        toast.error(t("error_messages.duplicate_quiz_fail"), { duration: 3000 });
      } finally {
        setIsSubmitting(false);
        reset();
      }
    }
  };

  const cancelFlow = () => {
    reset();
  };

  return {
    mode,
    step,
    title,
    setTitle,
    selectedQuizForDuplicate,
    isSubmitting,
    isValidatingTitle,
    titleError,
    submittingQuizId,

    isCreateTitleModalOpen: mode === "create" && step === 1,
    isDuplicateTitleModalOpen: mode === "duplicate" && step === 1,
    isVisibilityModalOpen: mode !== null && step === 2,

    startCreateQuizFlow,
    startDuplicateQuizFlow,
    handleTitleSubmit,
    handleBackFromVisibility,
    handleConfirmVisibility,
    cancelFlow,
  };
};
