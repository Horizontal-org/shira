import { useState } from "react";
import toast from "react-hot-toast";
import {
  createQuizFromTemplate,
  duplicateQuiz,
  type CreateTemplateQuizQuestionPayload,
} from "../fetch/quiz";
import {
  getQuizTemplateQuestions,
  LibraryQuizDto,
  type LibraryQuizQuestionTemplateDto,
} from "../fetch/quiz_templates";
import { Quiz } from "../store/slices/quiz";
import { getAppsByType, normalizePreviewAppName } from "../utils/appNames";
import { hasRequiredValue } from "../utils/validation";

type QuizFlowMode = "create" | "duplicate" | "template" | null;
type QuizFlowStep = 0 | 1 | 2;

interface UseQuizCreationFlowParams {
  createQuiz: (name: string, visibility: string) => void;
  fetchQuizzes: () => Promise<void>;
  t: (key: string, options?: any) => string;
}

export const useQuizCreationFlow = ({
  createQuiz,
  fetchQuizzes,
  t,
}: UseQuizCreationFlowParams) => {
  const [mode, setMode] = useState<QuizFlowMode>(null);
  const [step, setStep] = useState<QuizFlowStep>(1);
  const [title, setTitle] = useState("");

  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [selectedTemplateQuiz, setSelectedTemplateQuiz] = useState<LibraryQuizDto | null>(null);
  const [selectedTemplateQuestions, setSelectedTemplateQuestions] = useState<LibraryQuizQuestionTemplateDto[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingQuizId, setSubmittingQuizId] = useState<number | null>(null);

  const reset = () => {
    setMode(null);
    setStep(1);
    setTitle("");
    setSelectedQuizForDuplicate(null);
    setSelectedTemplateQuiz(null);
    setSelectedTemplateQuestions(null);
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

  const startTemplateQuizFlow = (
    quiz: LibraryQuizDto,
    questions?: LibraryQuizQuestionTemplateDto[],
  ) => {
    reset();
    setMode("template");
    setSelectedTemplateQuiz(quiz);
    setSelectedTemplateQuestions(questions && questions.length > 0 ? questions : null);
  };

  const resolveTemplateAppName = (question: LibraryQuizQuestionTemplateDto) => {
    const appOptions = question.appType ? getAppsByType(question.appType) : [];
    const normalizedAppName = question.appName
      ? normalizePreviewAppName(question.appName)
      : null;

    if (normalizedAppName) {
      const matchingApp = appOptions.find(
        (appOption) => appOption.name.toLowerCase() === normalizedAppName.toLowerCase(),
      );

      if (matchingApp) {
        return matchingApp.name;
      }

      return normalizedAppName;
    }

    if (appOptions.length > 0) {
      return appOptions[0].name;
    }

    throw new Error(`Missing supported app for template question ${question.questionId}`);
  };

  const mapTemplateQuestions = (
    questions: LibraryQuizQuestionTemplateDto[],
  ): CreateTemplateQuizQuestionPayload[] => {
    return questions.map((question) => ({
      questionName: question.questionName,
      content: question.content,
      isPhishing: question.isPhishing,
      appName: resolveTemplateAppName(question),
      explanations: question.explanations ?? [],
    }));
  };

  const moveToVisibilityStep = (newTitle: string) => {
    if (!hasRequiredValue(newTitle)) { return; }

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
      createQuiz(title.trim(), visibility);
      reset();
      return;
    }

    if (mode === "template" && selectedTemplateQuiz) {
      setStep(0);
      setIsSubmitting(true);

      try {
        const templateQuestions = selectedTemplateQuestions ?? await getQuizTemplateQuestions(selectedTemplateQuiz.id);

        if (!templateQuestions || templateQuestions.length === 0) {
          throw new Error("Failed to load template questions");
        }

        const mappedQuestions = mapTemplateQuestions(templateQuestions);
        await createQuizFromTemplate(title.trim(), visibility, mappedQuestions);

        toast.success(t("success_messages.quiz_created"), {
          duration: 3000,
        });

        await fetchQuizzes();
      } catch {
        toast.error(t("error_messages.duplicate_quiz_fail"), { duration: 3000 });
      } finally {
        setIsSubmitting(false);
        reset();
      }

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
    selectedTemplateQuiz,
    isSubmitting,
    submittingQuizId,

    isCreateTitleModalOpen: mode === "create" && step === 1,
    isDuplicateTitleModalOpen: mode === "duplicate" && step === 1,
    isTemplateTitleModalOpen: mode === "template" && step === 1,
    isVisibilityModalOpen: mode !== null && step === 2,

    startCreateQuizFlow,
    startDuplicateQuizFlow,
    startTemplateQuizFlow,
    moveToVisibilityStep,
    handleBackFromVisibility,
    handleConfirmVisibility,
    cancelFlow,
  };
};
