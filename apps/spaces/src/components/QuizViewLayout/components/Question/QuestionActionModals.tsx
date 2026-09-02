import { FunctionComponent } from "react";
import { styled } from '@horizontal-org/shira-ui'
import { QuizHasResultsModal } from "../../../modals/QuizHasResultsModal";
import { DeleteModal } from "../../../modals/DeleteModal";
import { useTranslation } from "react-i18next";
import { ConfirmModalInfo } from "./QuestionList";
import { ExportEntityModal } from "../../../modals/ExportEntityModal";
import { ImportEntityModal } from "../../../modals/ImportEntityModal";

interface Props {
  quizId: number;

  setResultsModalOpen: () => void;
  isResultsModalOpen: boolean;
  onResulsModalContinue: () => void;
  onResultsModalCancel: () => void;
  hasResults: boolean;

  showUnpublishOnDeleteModal: boolean;
  questionForDelete: { id: string; name: string } | null;
  handleQuestionForDelete: (question: { id: string; name: string } | null) => void;
  onDelete: (id: string) => void;
  handleTogglePublished: (quizId: number, publishedStatus: boolean) => void;

  isExportModalOpen: string | null;
  setExportModalOpen: (isOpen: boolean) => void;

  isImportModalOpen: boolean;
  setImportModalOpen: (isOpen: boolean) => void;
}

export const QuestionActionModals: FunctionComponent<Props> = ({
  setResultsModalOpen,
  isResultsModalOpen,
  onResultsModalCancel,
  onResulsModalContinue,
  showUnpublishOnDeleteModal,
  questionForDelete,
  handleQuestionForDelete,
  onDelete,
  hasResults,

  quizId,
  handleTogglePublished,

  isExportModalOpen,
  setExportModalOpen,

  isImportModalOpen,
  setImportModalOpen
}) => {

  const { t } = useTranslation();

  return (
    <>
      <DeleteModal
        title={showUnpublishOnDeleteModal
          ? t("modals.unpublish_quiz_on_delete.title", { question_name: questionForDelete?.name })
          : t("modals.delete_question.title", { question_name: questionForDelete?.name })
        }
        content={showUnpublishOnDeleteModal ? (
          <div>{t("modals.unpublish_quiz_on_delete.message")}</div>
        ) : (
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
        primaryButtonText={showUnpublishOnDeleteModal ? t('modals.unpublish_quiz_on_delete.confirm') : undefined}
        setIsModalOpen={() => {
          handleQuestionForDelete(null);
        }}
        onDelete={() => {
          if (questionForDelete) {
            handleQuestionForDelete(null);
            onDelete(questionForDelete.id);
            if (showUnpublishOnDeleteModal) {
              handleTogglePublished(quizId, false);
            }
          }
        }}
        onCancel={() => {
          handleQuestionForDelete(null);
        }}
        isModalOpen={!!questionForDelete}
      />

      <QuizHasResultsModal
        title={t("modals.edit_question_confirmation.title")}
        content={<div>{t("modals.edit_question_confirmation.message")}</div>}
        setIsModalOpen={setResultsModalOpen}
        isModalOpen={isResultsModalOpen}
        onContinue={onResulsModalContinue}
        onCancel={onResultsModalCancel}
      />

      <ExportEntityModal
        entityId={isExportModalOpen}
        entityType="question"
        isModalOpen={!!isExportModalOpen}
        setIsModalOpen={setExportModalOpen}
      />

      <ImportEntityModal
        entityType="question"
        isModalOpen={isImportModalOpen}
        setIsModalOpen={setImportModalOpen}
      />
    </>
  )
}

const WarningNote = styled.span`
  color: ${(props) => props.theme.colors.error7};
  font-weight: 500;
`;

const WarningLine = styled.span`
  display: inline;
`;
