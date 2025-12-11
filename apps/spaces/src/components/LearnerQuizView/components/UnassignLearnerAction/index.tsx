import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { Body1, Modal, ModalType } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import { AssignRequest, unassignFromQuiz } from "../../../../fetch/learner_quiz";

interface Props {
  learners: AssignRequest[];
  isOpen: boolean;
  onClose: () => void;
  openErrorModal: (content: string, retry: () => void) => void;
  onSuccess?: () => void;
}

export const UnassignLearnerAction: FunctionComponent<Props> = ({
  learners,
  isOpen,
  onClose,
  openErrorModal,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const learnerCount = learners.length;

  const handleConfirm = async () => {
    if (!learnerCount) {
      onClose();
      return;
    }

    setIsLoading(true);

    try {
      const response = await unassignFromQuiz(learners);

      if (response.status === "Error") {
        const content = getErrorContent("error_messages", "unassign_quiz_failed", response.message);
        openErrorModal(content, handleConfirm);
        return;
      }

      const key =
        learnerCount === 1
          ? "success_messages.learner_unassigned"
          : "success_messages.learners_unassigned_plural";

      toast.success(t(key, { count: learnerCount }), { duration: 3000 });
      onSuccess?.();
      onClose();
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "unassign_quiz_failed", e.message);
      openErrorModal(content, handleConfirm);
    } finally {
      setIsLoading(false);
    }
  };

  const title = t("modals.unassign_learners.title", { count: learnerCount });
  const subtitle = t("modals.unassign_learners.subtitle", { count: learnerCount });

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      primaryButtonText={t("buttons.unassign")}
      primaryButtonDisabled={isLoading}
      secondaryButtonText={t("buttons.cancel")}
      type={ModalType.Danger}
      onPrimaryClick={handleConfirm}
      onSecondaryClick={onClose}
    >
      <Body1>{subtitle}</Body1>
    </Modal>
  );
};
