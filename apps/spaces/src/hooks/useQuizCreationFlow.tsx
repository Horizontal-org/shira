import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  createQuizFromTemplate,
  duplicateQuiz,
  importQuiz,
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

type QuizFlowMode = "create" | "duplicate" | "template" | "import" | null;
type QuizFlowStep = 0 | 1 | 2 | 3;

interface QuizNameStepConfig {
  title: string;
  subtitle?: string;
  inputLabel: string;
  placeholder?: string;
  initialValue: string;
  cancelButtonText?: string;
}

interface UseQuizCreationFlowParams {
  createQuiz: (name: string, visibility: string) => Promise<number>;
  t: (key: string, options?: any) => string;
}

export const useQuizCreationFlow = ({
  createQuiz,
  t,
}: UseQuizCreationFlowParams) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<QuizFlowMode>(null);
  const [step, setStep] = useState<QuizFlowStep>(1);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<string | null>(null);

  const [selectedQuizForDuplicate, setSelectedQuizForDuplicate] = useState<Quiz | null>(null);
  const [selectedTemplateQuiz, setSelectedTemplateQuiz] = useState<LibraryQuizDto | null>(null);
  const [selectedTemplateQuestions, setSelectedTemplateQuestions] = useState<LibraryQuizQuestionTemplateDto[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingQuizId, setSubmittingQuizId] = useState<number | null>(null);

  const reset = () => {
    setMode(null);
    setStep(1);
    setTitle("");
    setVisibility(null);
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

  const startImportQuizFlow = () => {
    reset();
    setMode("import");
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
      images: question.images ?? [],
      explanations: question.explanations ?? [],
    }));
  };

  const nameStepConfig: QuizNameStepConfig = useMemo(() => {
    if (mode === "duplicate") {
      return {
        title: t('modals.duplicate_quiz.title'),
        subtitle: t('modals.duplicate_quiz.subtitle'),
        inputLabel: t('modals.duplicate_quiz.quiz_name'),
        placeholder: selectedQuizForDuplicate
          ? t('modals.duplicate_quiz.quiz_name_placeholder', { quiz_name: selectedQuizForDuplicate.title })
          : undefined,
        initialValue: selectedQuizForDuplicate ? `Copy of ${selectedQuizForDuplicate.title}` : "",
        cancelButtonText: t('buttons.back'),
      };
    }

    if (mode === "template") {
      return {
        title: t('modals.add_quiz_from_template.title'),
        subtitle: t('modals.add_quiz_from_template.subtitle'),
        inputLabel: t('modals.add_quiz_from_template.input_label'),
        initialValue: selectedTemplateQuiz?.title ?? "",
      };
    }

    return {
      title: t('modals.create_quiz.title'),
      inputLabel: t('modals.create_quiz.placeholder'),
      initialValue: "",
    };
  }, [mode, selectedQuizForDuplicate, selectedTemplateQuiz, t]);

  const moveToVisibilityStep = (newTitle: string) => {
    if (!hasRequiredValue(newTitle)) { return; }

    setTitle(newTitle);
    setStep(2);
  };

  const handleBackFromVisibility = () => {
    setStep(1);
  };

  const handleConfirmVisibility = async (selectedVisibility: string) => {
    if (!hasRequiredValue(title)) return;

    if (mode === "import") {
      setVisibility(selectedVisibility);
      setStep(3);
      return;
    }

    if (mode === "create") {
      setStep(0);
      setIsSubmitting(true);

      try {
        const quizId = await createQuiz(title.trim(), selectedVisibility);

        navigate(`/quiz/${quizId}`);
      } catch {
        toast.error(t("error_messages.duplicate_quiz_fail"), { duration: 3000 });
      } finally {
        setIsSubmitting(false);
        reset();
      }

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
        const quizId = await createQuizFromTemplate(title.trim(), selectedVisibility, mappedQuestions);

        toast.success(t("success_messages.quiz_created"), {
          duration: 3000,
        });

        navigate(`/quiz/${quizId}`);
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
        const duplicatedQuiz = await duplicateQuiz(quizId, title.trim(), selectedVisibility);

        toast.success(t("success_messages.quiz_duplicated", { quiz_name: title.trim() }), {
          duration: 3000,
        });

        navigate(`/quiz/${duplicatedQuiz.quiz.id}`);
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

  const finishImportFlow = (quizId: number) => {
    navigate(`/quiz/${quizId}`);
    reset();
  };

  const submitImportFile = async (file: File): Promise<number> => {
    const { quizId } = await importQuiz(file, title.trim(), visibility as string);
    return quizId;
  };

  return {
    mode,
    step,
    title,
    setTitle,
    visibility,
    selectedQuizForDuplicate,
    selectedTemplateQuiz,
    isSubmitting,
    submittingQuizId,
    nameStepConfig,

    isNameModalOpen: mode !== null && step === 1,
    isVisibilityModalOpen: mode !== null && step === 2,
    isImportFileModalOpen: mode === "import" && step === 3,

    startCreateQuizFlow,
    startDuplicateQuizFlow,
    startTemplateQuizFlow,
    startImportQuizFlow,
    moveToVisibilityStep,
    handleBackFromVisibility,
    handleConfirmVisibility,
    finishImportFlow,
    submitImportFile,
    cancelFlow,
  };
};
