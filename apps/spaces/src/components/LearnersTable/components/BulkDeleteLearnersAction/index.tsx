import { FunctionComponent, ReactNode } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteLearners } from "../../../../fetch/learner";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import { DeleteModal } from "../../../modals/DeleteModal";

interface Props {
  learnerIds: number[];
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  openErrorModal: (content: ReactNode, retry: () => void) => void;
  onDeleted: () => void;
  onCancel?: () => void;
}

export const BulkDeleteLearnersAction: FunctionComponent<Props> = ({
  learnerIds,
  isModalOpen,
  setIsModalOpen,
  openErrorModal,
  onDeleted,
  onCancel,
}) => {
  const { t } = useTranslation();

  const deleteSelectedLearners = async () => {
    if (!learnerIds.length) {
      setIsModalOpen(false);
      return;
    }

    try {
      await deleteLearners(learnerIds);
      toast.success(t("success_messages.learners_deleted"), { duration: 3000 });

      onDeleted();
      setIsModalOpen(false);
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "delete_learners_failed", e.message);

      openErrorModal(content, deleteSelectedLearners);
    }
  };

  return (
    <DeleteModal
      title={t("modals.delete_learners.title")}
      content={<div>{t("modals.delete_learners.subtitle")}</div>}
      setIsModalOpen={setIsModalOpen}
      onDelete={deleteSelectedLearners}
      onCancel={() => {
        setIsModalOpen(false);
        onCancel?.();
      }}
      isModalOpen={isModalOpen}
    />
  );
};
