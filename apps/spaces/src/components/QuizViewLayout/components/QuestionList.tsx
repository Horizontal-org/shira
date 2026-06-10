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
import { duplicateQuestion } from "../../../fetch/quiz";
import { useStore } from "../../../store";
import { QuizQuestion } from "../../../store/slices/quiz";
import { DeleteModal } from "../../modals/DeleteModal";
import { QuizHasResultsModal } from "../../modals/QuizHasResultsModal";
import { UnpublishQuizOnDeleteModal } from "../../modals/UnpublishQuizOnDeleteModal";
import { QuestionEmptyState } from "./QuestionEmptyState";
import { QuestionTable } from "./QuestionTable";

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
  hasResults: boolean
}

type ConfirmAction = "add" | "edit" | "duplicate";

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
  hasResults
}) => {
  const { t } = useTranslation();

  const [questionForDelete, handleQuestionForDelete] = useState<QuizQuestion["question"] | null>(null);
  const [confirmBeforeContinueModal, handleConfirmBeforeContinueModal] = useState<{
    confirmType: ConfirmAction;
    confirmId?: string;
  } | null>(null);
  const [duplicatingQuestions, setDuplicatingQuestions] = useState<Set<string>>(new Set());

  const { updateQuiz } = useStore((state) => ({
    updateQuiz: state.updateQuiz
  }), shallow);

  const handleDuplicateQuestion = async (questionId: string) => {
    setDuplicatingQuestions((prev) => new Set(prev).add(questionId));
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
      setDuplicatingQuestions((prev) => {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
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
      />
    );
  }

  const isDeletingLastQuestion = !!questionForDelete && quizQuestions.length === 1;
  const showUnpublishOnDeleteModal = isDeletingLastQuestion && quizPublished;

  return (
    <div>
      <Header>
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
          onClick={() => onAddLibrary(quizId.toString())}
        />
      </Header>

      <QuestionTable
        quizQuestions={quizQuestions}
        duplicatingQuestions={duplicatingQuestions}
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
        onDeleteQuestion={(questionId) => {
          handleQuestionForDelete(
            quizQuestions.find((quizQuestion) => quizQuestion.question.id === questionId)?.question ?? null
          );
        }}
        onReorder={onReorder}
      />

      {showUnpublishOnDeleteModal ? (
        <UnpublishQuizOnDeleteModal
          questionName={questionForDelete.name}
          setIsModalOpen={() => {
            handleQuestionForDelete(null);
          }}
          onConfirm={() => {
            if (questionForDelete) {
              onDelete(questionForDelete.id);
              handleTogglePublished(quizId, false);
            }
          }}
          onCancel={() => {
            handleQuestionForDelete(null);
          }}
          isModalOpen={isDeletingLastQuestion}
        />
      ) : (
        <DeleteModal
          title={t("modals.delete_question.title", { question_name: questionForDelete?.name })}
          content={(
            <div>
              {t("modals.delete_question.message")}
              <br />
              <br />
              {hasResults && (
                <WarningLine>
                  <WarningNote>{t("modals.delete_question.note")}</WarningNote>
                  {t("modals.delete_question.warning")}
                </WarningLine>
              )}
            </div>
          )}
          setIsModalOpen={() => {
            handleQuestionForDelete(null);
          }}
          onDelete={() => {
            if (questionForDelete) {
              onDelete(questionForDelete.id);
            }
          }}
          onCancel={() => {
            handleQuestionForDelete(null);
          }}
          isModalOpen={!!questionForDelete}
        />
      )}

      <QuizHasResultsModal
        title={t("modals.edit_question_confirmation.title")}
        content={<div>{t("modals.edit_question_confirmation.message")}</div>}
        setIsModalOpen={() => {
          handleConfirmBeforeContinueModal(null);
        }}
        onContinue={() => {
          if (confirmBeforeContinueModal?.confirmType === "add") {
            onAdd();
          } else if (confirmBeforeContinueModal?.confirmType === "edit" && confirmBeforeContinueModal.confirmId) {
            onEdit(confirmBeforeContinueModal.confirmId);
          } else if (confirmBeforeContinueModal?.confirmType === "duplicate" && confirmBeforeContinueModal.confirmId) {
            handleDuplicateQuestion(confirmBeforeContinueModal.confirmId);
          }
        }}
        onCancel={() => {
          handleConfirmBeforeContinueModal(null);
        }}
        isModalOpen={!!confirmBeforeContinueModal}
      />
    </div>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 16px;
  gap: 10px;
`;

const WarningNote = styled.span`
  color: #d73527;
  font-weight: 500;
`;

const WarningLine = styled.span`
  display: inline;
`;

export default QuestionsList;
