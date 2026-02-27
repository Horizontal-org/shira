import { useState } from "react";
import toast from "react-hot-toast";
import { duplicateQuiz } from "../fetch/quiz";
import { Quiz } from "../store/slices/quiz";
import { hasRequiredValue } from "../utils/validation";

type QuizFlowMode = "create" | "duplicate" | null;
type QuizFlowStep = 0 | 1 | 2;

interface UseQuizCreationFlowParams {
  createQuiz: (title: string, visibility: string) => void;
  fetchQuizzes: () => Promise<void>;
  t: (key: string, options?: any) => string;
}

export const useQuizCreationFlow = ({ createQuiz, fetchQuizzes, t }: UseQuizCreationFlowParams) => {
  const [mode, setMode] = useState<QuizFlowMode>(null);
  const [step, setStep] = useState<QuizFlowStep>(1);
  const [title, setTitle] = useState("");

  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submittingQuizId, setSubmittingQuizId] = useState<number | null>(null);

  const reset = () => {
    setMode(null);
    setStep(1);
    setTitle("");
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

  const handleTitleSubmit = (newTitle: string) => {
    if (!hasRequiredValue(newTitle)) return;
    setTitle(newTitle);
    setStep(2);
  };

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
