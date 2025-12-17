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
  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz>(null);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const reset = () => {
    setMode(null);
    setStep(1);
    setTitle("");
    setSelectedQuizForDuplicate(null);
  };

  const startCreateQuizFlow = () => {
    reset();
    setMode("create");
    setStep(1);
  };

  const startDuplicateQuizFlow = (quiz: Quiz) => {
    reset();
    setMode("duplicate");
    setSelectedQuizForDuplicate(quiz);
    setStep(1);
  };

  const handleTitleSubmit = (newTitle: string) => {
    setTitle(newTitle);
    setStep(2);
  };

  const handleBackFromVisibility = () => {
    setStep(1);
  };

  const handleConfirmVisibility = async (visibility: "public" | "private") => {
    if (mode === "create") {
      createQuiz(title, visibility);
      reset();
      return;
    }

    if (mode === "duplicate" && selectedQuizForDuplicate) {
      try {
        setIsDuplicating(true);

        await Promise.all([
          duplicateQuiz(selectedQuizForDuplicate.id, title, visibility),
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);

        toast.success(
          t("success_messages.quiz_created", { quiz_name: title }),
          { duration: 3000 }
        );

        fetchQuizzes();
        reset();
      } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.error(t("error_messages.duplicate_quiz_fail"), { duration: 3000 });
        console.error("Duplicate quiz error:", error);
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
