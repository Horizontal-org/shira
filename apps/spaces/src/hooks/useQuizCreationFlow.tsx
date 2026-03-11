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
  const [name, setName] = useState("");

  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingName, setIsValidatingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [submittingQuizId, setSubmittingQuizId] = useState<number | null>(null);

  const latestValidationIdRef = useRef(0);

  const reset = () => {
    setMode(null);
    setStep(1);
    setName("");
    setIsValidatingName(false);
    setNameError(null);
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

  const handleNameSubmit = async (newName: string) => {
    const trimmedName = newName.trim();

    if (!hasRequiredValue(trimmedName) || isValidatingName) {
      return;
    }

    setIsValidatingName(true);

    const error = await getQuizNameValidationError({
      name: trimmedName,
      validateQuizName,
    });

    setNameError(error);
    setIsValidatingName(false);

    if (error) {
      return;
    }

    setName(trimmedName);
    setStep(2);
  };

  useEffect(() => {
    if (mode === null || step !== 1) {
      return;
    }

    const trimmedName = name.trim();

    if (trimmedName.length < QUIZ_NAME_VALIDATION_MIN_LENGTH) {
      setNameError(null);
      setIsValidatingName(false);
      return;
    }

    const validationId = ++latestValidationIdRef.current;

    const timeoutId = window.setTimeout(async () => {
      setIsValidatingName(true);

      const error = await getQuizNameValidationError({
        name: trimmedName,
        validateQuizName,
      });

      if (latestValidationIdRef.current !== validationId) {
        return;
      }

      setNameError(error);
      setIsValidatingName(false);
    }, QUIZ_NAME_VALIDATION_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [mode, step, name, validateQuizName]);

  useEffect(() => {
    return () => {
      latestValidationIdRef.current += 1;
    };
  }, []);

  const handleBackFromVisibility = () => {
    setStep(1);
  };

  const handleConfirmVisibility = async (visibility: string) => {
    if (!hasRequiredValue(name)) return;

    if (mode === "create") {
      setStep(0);
      await createQuiz(name.trim(), visibility);
      reset();
      return;
    }

    if (mode === "duplicate" && selectedQuizForDuplicate) {
      const quizId = selectedQuizForDuplicate.id;

      setStep(0);
      setIsSubmitting(true);
      setSubmittingQuizId(quizId);

      try {
        await duplicateQuiz(quizId, name.trim(), visibility);

        toast.success(t("success_messages.quiz_duplicated", { quiz_name: name.trim() }), {
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
    name,
    setName,
    selectedQuizForDuplicate,
    isSubmitting,
    isValidatingName,
    nameError,
    submittingQuizId,

    isCreateNameModalOpen: mode === "create" && step === 1,
    isDuplicateNameModalOpen: mode === "duplicate" && step === 1,
    isVisibilityModalOpen: mode !== null && step === 2,

    startCreateQuizFlow,
    startDuplicateQuizFlow,
    handleNameSubmit,
    handleBackFromVisibility,
    handleConfirmVisibility,
    cancelFlow,
  };
};
