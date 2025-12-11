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

  const unassign = async () => {
    setIsLoading(true);

    try {
      const response = await unassignFromQuiz(learners);

      if (response.status === "Error") {
        const content = getErrorContent("error_messages", "unassign_quiz_failed", response.message);
        openErrorModal(content, unassign);
        return;
      }

      const successMessage =
        learners.length === 1
          ? t("success_messages.learner_assigned", { count: learners.length })
          : t("success_messages.learners_assigned_plural", {
            count: learners.length,
          });

      toast.success(successMessage, { duration: 3000 });

      onSuccess?.();
      onClose();
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "unassign_quiz_failed", e.message);
      openErrorModal(content, unassign);
    } finally {
      setIsLoading(false);
    }
  };

  const title = t("modals.unassign_learners.title", { count: learners.length });
  const subtitle = t("modals.unassign_learners.subtitle", { count: learners.length });

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      primaryButtonText={t("buttons.unassign")}
      primaryButtonDisabled={isLoading}
      secondaryButtonText={t("buttons.cancel")}
      type={ModalType.Danger}
      onPrimaryClick={unassign}
      onSecondaryClick={onClose}
    >
      <Body1>{subtitle}</Body1>
    </Modal>
  );
};
