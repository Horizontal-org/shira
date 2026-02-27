import { FunctionComponent, ReactNode } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteLearners } from "../../../../fetch/learner";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import { DeleteModal } from "../../../modals/DeleteModal";

interface Props {
  learnerId: number;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  openErrorModal: (content: ReactNode, retry: () => void) => void;
  onDeleted: (id: number) => void;
  onCancel?: () => void;
}

export const DeleteLearnerAction: FunctionComponent<Props> = ({
  learnerId,
  isModalOpen,
  setIsModalOpen,
  openErrorModal,
  onDeleted,
  onCancel,
}) => {
  const { t } = useTranslation();

  const deleteLearner = async () => {
    try {
      await deleteLearners([learnerId]);
      toast.success(t("success_messages.learner_deleted"), { duration: 3000 });

      onDeleted(learnerId);
      setIsModalOpen(false);
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "delete_learner_failed", e.message);

      openErrorModal(content, deleteLearner);
    }
  };

  return (
    <DeleteModal
      title={t("modals.delete_learner.title")}
      content={<div>{t("modals.delete_learner.subtitle")}</div>}
      setIsModalOpen={setIsModalOpen}
      onDelete={deleteLearner}
      onCancel={() => {
        setIsModalOpen(false);
        onCancel?.();
      }}
      isModalOpen={isModalOpen}
    />
  );
};
