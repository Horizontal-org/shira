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
import { deleteNote } from "../../../../fetch/note";
import { useStore } from "../../../../store";
import { usePublicLibrary } from "../../../../hooks/usePublicLibrary";
import { QuizQuestion, QuizViewItem } from "../../../../store/slices/quiz";
import { QuestionEmptyState } from "./QuestionEmptyState";
import { QuizItemsTable } from "./QuizItemsTable";
import { QuestionActionModals } from "./QuestionActionModals";
import { QuizItemCreateOptions } from "../QuizItem/QuizItemCreateOptions";
import { DeleteModal } from "../../../modals/DeleteModal";

interface QuestionsListProps {
  quizId: number;
  quizQuestions: QuizViewItem[];
  quizPublished: boolean;
  onEdit: (type: 'question' | 'note', id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onAddLibrary: (quizId: string) => void;
  onReorder: (newOrder: QuizViewItem[]) => void;
  onRefresh: () => void;
  onSubmitAsTemplate: (questionId: string) => void;
  hasResults: boolean,
  onCreateNote: () => void
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
  onRefresh,
  onSubmitAsTemplate,
  hasResults,
  onCreateNote
}) => {
  const { t } = useTranslation();
  const { isPublicLibraryEnabled } = usePublicLibrary();

  const [questionForDelete, handleQuestionForDelete] = useState<QuizQuestion["question"] | null>(null);
  const [noteForDelete, handleNoteForDelete] = useState<{ id: string; name: string } | null>(null);
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
    const questionName = quizQuestions.find(
      (item): item is QuizQuestion => item.entityType === "question" && item.question.id === questionId
    )?.question.name;

    try {
      await duplicateQuestion(quizId, Number(questionId));
      toast.success(
        t("success_messages.question_copied", { question_name: questionName }),
        { duration: 3000 },
      );
      onRefresh(); // Refresh the quiz data
    } catch (error) {
      toast.error(t("error_messages.duplicate_question_fail"), { duration: 3000 });
    } finally {
      setDuplicatingQuestionId(null);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(quizId, Number(noteId));
    } catch (error) {
      toast.error(t("error_messages.delete_note_fail"), { duration: 3000 });
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

      <QuizItemCreateOptions
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
        onCreateNote={onCreateNote}
      />


      <QuizItemsTable
        items={quizQuestions}
        duplicatingQuestionId={duplicatingQuestionId}
        onEditNote={(noteId) => { onEdit('note', noteId) }}
        onEditQuestion={(questionId) => {
          if (hasResults) {
            handleConfirmBeforeContinueModal({ confirmType: "edit", confirmId: questionId });
          } else {
            onEdit('question', questionId);
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
            quizQuestions.find(
              (item): item is QuizQuestion => item.entityType === "question" && item.question.id === questionId
            )?.question ?? null
          );
        }}
        onDeleteNote={(noteId) => {
          const note = quizQuestions.find(
            (item) => item.entityType === "note" && item.entityId.toString() === noteId
          );
          handleNoteForDelete({
            id: noteId,
            name: note?.entityType === "note" ? note.note.name : ""
          });
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
            onEdit('question', confirmBeforeContinueModal.confirmId);
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
        onImportSuccess={onRefresh}
      />

      <DeleteModal
        title={t("modals.delete_note.title", { note_name: noteForDelete?.name })}
        content={<div>{t("modals.delete_note.message")}</div>}
        setIsModalOpen={() => { handleNoteForDelete(null) }}
        onDelete={() => {
          if (noteForDelete) {
            handleDeleteNote(noteForDelete.id);
            handleNoteForDelete(null);
          }
        }}
        onCancel={() => { handleNoteForDelete(null) }}
        isModalOpen={!!noteForDelete}
      />
    </div>
  );
};


export default QuestionsList;
