import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { Body1, Modal, ModalType } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import { unassignFromQuiz } from "../../../../fetch/learner_quiz";

interface Props {
  quizId: number;
  learnerIds: number[];
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  openErrorModal: (content: string, retry: () => void) => void;
  onSuccess: () => void;
  onCancel?: () => void;
}

export const BulkUnassignLearnersAction: FunctionComponent<Props> = ({
  quizId,
  learnerIds,
  isModalOpen,
  setIsModalOpen,
  openErrorModal,
  onSuccess,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    onCancel?.();
  };

  const learnersPayload = learnerIds.map((learnerId) => ({
    learnerId,
    quizId,
  }));

  const unassignSelectedLearners = async () => {
    if (!learnerIds.length) {
      closeModal();
      return;
    }

    setIsLoading(true);

    try {
      const response = await unassignFromQuiz(learnersPayload);

      if (response.data.status === "Error") {
        const content = getErrorContent("error_messages", "unassign_quiz_failed", response.data.message);
        openErrorModal(content, unassignSelectedLearners);
        return;
      }

      const message = () => {
        if (learnerIds.length === 1) {
          return t("success_messages.learner_unassigned", { count: learnerIds.length });
        }

        return t("success_messages.learners_unassigned_plural", { count: learnerIds.length });
      };

      toast.success(message(), { duration: 3000 });
      onSuccess();
      closeModal();
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "unassign_quiz_failed", e.message);

      openErrorModal(content, unassignSelectedLearners);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      title={t("modals.unassign_learners.title")}
      primaryButtonText={t("buttons.unassign")}
      primaryButtonDisabled={isLoading}
      secondaryButtonText={t("buttons.cancel")}
      type={ModalType.Danger}
      onPrimaryClick={unassignSelectedLearners}
      onSecondaryClick={closeModal}
    >
      <Body1>{t("modals.unassign_learners.subtitle")}</Body1>
    </Modal>
  );
};
