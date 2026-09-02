import { FunctionComponent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import {
  Button,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { shallow } from "zustand/shallow";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { duplicateQuestion } from "../../../../fetch/quiz";
import { useStore } from "../../../../store";
import { usePublicLibrary } from "../../../../hooks/usePublicLibrary";
import { QuizQuestion } from "../../../../store/slices/quiz";
import { QuestionEmptyState } from "./QuestionEmptyState";
import { QuestionTable } from "./QuestionTable";
import { QuestionActionModals } from "./QuestionActionModals";
import { QuestionCreateOptions } from "./QuestionCreateOptions";

interface QuestionsListProps {
  quizId: number;
  quizQuestions: QuizQuestion[];
  quizPublished: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onAddLibrary: (quizId: string) => void;
  onReorder: (newOrder: QuizQuestion[]) => void;
  onDuplicate: () => void;
  onSubmitAsTemplate: (questionId: string) => void;
  hasResults: boolean
}

export interface ConfirmModalInfo {
  confirmType: "add" | "edit" | "duplicate";
  confirmId?: string;
}

export const QuestionsList: FunctionComponent<QuestionsListProps> = ({
  quizId,
  quizQuestions,
  quizPublished,
  onEdit,
  onDelete,
  onAdd,
  onAddLibrary,
  onReorder,
  onDuplicate,
  onSubmitAsTemplate,
  hasResults
}) => {
  const { t } = useTranslation();
  const { isPublicLibraryEnabled } = usePublicLibrary();

  const [questionForDelete, handleQuestionForDelete] = useState<QuizQuestion["question"] | null>(null);
  const [confirmBeforeContinueModal, handleConfirmBeforeContinueModal] = useState<ConfirmModalInfo | null>(null);
  const [duplicatingQuestionId, setDuplicatingQuestionId] = useState<string | null>(null);

  const [isExportModalOpen, setExportModalOpen] = useState<string | null>(null);
  const [isImportModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [isCreationOptionsModalOpen, setIsCreationOptionsModalOpen] = useState(false);

  const { updateQuiz } = useStore((state) => ({
    updateQuiz: state.updateQuiz
  }), shallow);

  const handleDuplicateQuestion = async (questionId: string) => {
    setDuplicatingQuestionId(questionId);
    const questionName = quizQuestions.find((qq) => qq.question.id === questionId)?.question.name;

    try {
      await duplicateQuestion(quizId, Number(questionId));
      toast.success(
        t("success_messages.question_copied", { question_name: questionName }),
        { duration: 3000 },
      );
      onDuplicate(); // Refresh the quiz data
    } catch (error) {
      toast.error(t("error_messages.duplicate_question_fail"), { duration: 3000 });
    } finally {
      setDuplicatingQuestionId(null);
    }
  };

  const handleTogglePublished = async (cardId: number, published: boolean) => {
    updateQuiz({
      id: cardId,
      published: published
    }, published ? "update_published" : "update_unpublished");
  };

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <QuestionEmptyState
        onAdd={onAdd}
        onAddLibrary={onAddLibrary}
        quizId={String(quizId)}
        isAddLibraryDisabled={!isPublicLibraryEnabled}
      />
    );
  }

  const isDeletingLastQuestion = !!questionForDelete && quizQuestions.length === 1;
  const showUnpublishOnDeleteModal = isDeletingLastQuestion && quizPublished;

  return (
    <div>
      {/* <Header>
        <Button
          id="create-question-button"
          leftIcon={<FiPlus size={16} />}
          text={t("questions_tab.create_question_button")}
          type="primary"
          color={defaultTheme.colors.green7}
          onClick={() => {
            if (hasResults) {
              handleConfirmBeforeContinueModal({ confirmType: "add" });
            } else {
              onAdd();
            }
          }}
        />
        <Button
          id="use-library-question-button"
          leftIcon={<MdOutlineMenuBook size={19} />}
          text={t("questions_tab.use_library_question_button")}
          type="primary"
          color={defaultTheme.colors.green7}
          disabled={!isPublicLibraryEnabled}
          onClick={() => onAddLibrary(quizId.toString())}
        />
      </Header> */}

      <QuestionCreateOptions
        isCreationOptionsModalOpen={isCreationOptionsModalOpen}
        setIsCreationOptionsModalOpen={(toggle) => {
          if (toggle && hasResults) {
            handleConfirmBeforeContinueModal({ confirmType: "add" });
          } else {
            setIsCreationOptionsModalOpen(toggle)
          }
        }}
        onImport={() => { setImportModalOpen(true) }}
        onAddLibrary={() => onAddLibrary(quizId.toString())}
        onAdd={() => { onAdd() }}
      />


      <QuestionTable
        quizQuestions={quizQuestions}
        duplicatingQuestionId={duplicatingQuestionId}
        onEditQuestion={(questionId) => {
          if (hasResults) {
            handleConfirmBeforeContinueModal({ confirmType: "edit", confirmId: questionId });
          } else {
            onEdit(questionId);
          }
        }}
        onDuplicateQuestion={(questionId) => {
          if (hasResults) {
            handleConfirmBeforeContinueModal({ confirmType: "duplicate", confirmId: questionId });
          } else {
            handleDuplicateQuestion(questionId);
          }
        }}
        onSubmitQuestionAsTemplate={onSubmitAsTemplate}
        onExportQuestion={(questionId) => { setExportModalOpen(questionId); }}
        onDeleteQuestion={(questionId) => {
          handleQuestionForDelete(
            quizQuestions.find((quizQuestion) => quizQuestion.question.id === questionId)?.question ?? null
          );
        }}
        onReorder={onReorder}
      />

      <QuestionActionModals
        quizId={quizId}

        hasResults={hasResults}
        setResultsModalOpen={() => { handleConfirmBeforeContinueModal(null) }}
        isResultsModalOpen={!!confirmBeforeContinueModal}
        onResultsModalCancel={() => { handleConfirmBeforeContinueModal(null) }}
        onResulsModalContinue={() => {
          if (confirmBeforeContinueModal?.confirmType === "add") {
            setIsCreationOptionsModalOpen(true)
          } else if (confirmBeforeContinueModal?.confirmType === "edit" && confirmBeforeContinueModal.confirmId) {
            onEdit(confirmBeforeContinueModal.confirmId);
          } else if (confirmBeforeContinueModal?.confirmType === "duplicate" && confirmBeforeContinueModal.confirmId) {
            handleDuplicateQuestion(confirmBeforeContinueModal.confirmId);
          }
        }}

        questionForDelete={questionForDelete}
        handleQuestionForDelete={handleQuestionForDelete}
        onDelete={onDelete}
        handleTogglePublished={handleTogglePublished}
        showUnpublishOnDeleteModal={showUnpublishOnDeleteModal}

        isExportModalOpen={isExportModalOpen}
        setExportModalOpen={() => { setExportModalOpen(null) }}

        isImportModalOpen={isImportModalOpen}
        setImportModalOpen={(isOpen) => { setImportModalOpen(isOpen) }}
        onImportSuccess={onDuplicate}
      />
    </div>
  );
};


export default QuestionsList;
