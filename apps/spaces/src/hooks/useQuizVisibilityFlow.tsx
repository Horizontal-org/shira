import { useState } from "react";
import toast from "react-hot-toast";
import { duplicateQuiz } from "../fetch/quiz";
import { Quiz } from "../store/slices/quiz";

type QuizFlowMode = "create" | "duplicate" | null;
type QuizFlowStep = 1 | 2;

interface UseQuizFlowParams {
  createQuiz: (title: string, visibility: string) => void;
  fetchQuizzes: () => void;
  t: (key: string, options?: any) => string;
}

export const useQuizVisibilityFlow = ({ createQuiz, fetchQuizzes, t }: UseQuizFlowParams) => {
  const [mode, setMode] = useState<QuizFlowMode>(null);
  const [step, setStep] = useState<QuizFlowStep>(1);
  const [title, setTitle] = useState("");

  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const reset = () => {
    setMode(null);
    setStep(1);
    setTitle("");
    setSelectedQuizForDuplicate(null);
    setIsDuplicating(false);
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
    setTitle(newTitle);
    setStep(2);
  };

  const handleBackFromVisibility = () => {
    setStep(1);
  };

  const handleConfirmVisibility = async (visibility: string) => {
    if (!title || title.trim() === "") return;

    if (mode === "create") {
      createQuiz(title.trim(), visibility);
      reset();
      return;
    }

    if (mode === "duplicate" && selectedQuizForDuplicate) {
      try {
        setIsDuplicating(true);

        await duplicateQuiz(selectedQuizForDuplicate.id, title.trim(), visibility);

        toast.success(t("success_messages.quiz_created", { quiz_name: title.trim() }), {
          duration: 3000,
        });

        fetchQuizzes();
        reset();
      } catch (error) {
        toast.error(t("error_messages.duplicate_quiz_fail"), { duration: 3000 });
      } finally {
        setIsDuplicating(false);
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
    isDuplicating,

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
