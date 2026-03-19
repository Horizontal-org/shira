import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { duplicateQuiz } from "../fetch/quiz";
import { Quiz } from "../store/slices/quiz";
import { hasRequiredValue } from "../utils/validation";
import {
  QUIZ_NAME_VALIDATION_DELAY_MS,
  QUIZ_NAME_VALIDATION_MIN_LENGTH,
  getQuizNameValidationError,
} from "../utils/quizNameValidation";

type QuizFlowMode = "create" | "duplicate" | null;
type QuizFlowStep = 0 | 1 | 2;

interface UseQuizCreationFlowParams {
  createQuiz: (name: string, visibility: string) => void;
  fetchQuizzes: () => Promise<void>;
  validateQuizName: (name: string) => Promise<void>;
  t: (key: string, options?: any) => string;
}

export const useQuizCreationFlow = ({
  createQuiz,
  fetchQuizzes,
  validateQuizName,
  t,
}: UseQuizCreationFlowParams) => {
  const [mode, setMode] = useState<QuizFlowMode>(null);
  const [step, setStep] = useState<QuizFlowStep>(1);
  const [title, setTitle] = useState("");

  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingTitle, setIsValidatingTitle] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [submittingQuizId, setSubmittingQuizId] = useState<number | null>(null);

  const latestValidationIdRef = useRef(0);

  const reset = () => {
    setMode(null);
    setStep(1);
    setTitle("");
    setIsValidatingTitle(false);
    setTitleError(null);
    setSelectedQuizForDuplicate(null);
    setSubmittingQuizId(null);
    latestValidationIdRef.current += 1;
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

  const moveToVisibilityStep = (newTitle: string) => {
    if (!hasRequiredValue(newTitle)) { return; }

    setTitle(newTitle);
    setStep(2);
  };

  const handleTitleSubmit = async (newTitle: string) => {
    const trimmedTitle = newTitle.trim();

    if (!hasRequiredValue(trimmedTitle) || isValidatingTitle) {
      return;
    }

    setIsValidatingTitle(true);

    const error = await getQuizNameValidationError({
      name: trimmedTitle,
      validateQuizName,
    });

    setTitleError(error);
    setIsValidatingTitle(false);

    if (error) {
      return;
    }

    setTitle(trimmedTitle);
    setStep(2);
  };

  useEffect(() => {
    if (mode === null || step !== 1) {
      return;
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length < QUIZ_NAME_VALIDATION_MIN_LENGTH) {
      setTitleError(null);
      setIsValidatingTitle(false);
      return;
    }

    const validationId = ++latestValidationIdRef.current;

    const timeoutId = window.setTimeout(async () => {
      setIsValidatingTitle(true);

      const error = await getQuizNameValidationError({
        name: trimmedTitle,
        validateQuizName,
      });

      if (latestValidationIdRef.current !== validationId) {
        return;
      }

      setTitleError(error);
      setIsValidatingTitle(false);
    }, QUIZ_NAME_VALIDATION_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [mode, step, title, validateQuizName]);

  useEffect(() => {
    return () => {
      latestValidationIdRef.current += 1;
    };
  }, []);

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
      } catch {
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
    moveToVisibilityStep,
    handleTitleSubmit,
    handleBackFromVisibility,
    handleConfirmVisibility,
    cancelFlow,
  };
};
