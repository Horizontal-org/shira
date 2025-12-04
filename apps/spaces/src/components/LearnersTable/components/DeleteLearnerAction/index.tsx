import { FunctionComponent, ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteLearners } from "../../../../fetch/learner";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import { DeleteModal } from "../../../modals/DeleteModal";

interface Props {
  learnerId: number;
  openErrorModal: (content: ReactNode, retry: () => void) => void;
  onDeleted: (id: number) => void;
  children: (openDeleteModal: () => void) => ReactNode;
}

export const DeleteLearnerAction: FunctionComponent<Props> = ({
  learnerId,
  openErrorModal,
  onDeleted,
  children,
}) => {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteLearnerHandler = async () => {
    try {
      await deleteLearners([learnerId]);
      toast.success(t("success_messages.learner_deleted"), { duration: 3000 });

      setIsDeleteModalOpen(false);
      onDeleted(learnerId);
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "delete_learner_failed", e.message);

      openErrorModal(content, deleteLearnerHandler);
    }
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);

  return (
    <>
      {children(openDeleteModal)}

      <DeleteModal
        title={t("modals.delete_learner.title")}
        content={<div>{t("modals.delete_learner.subtitle")}</div>}
        setIsModalOpen={setIsDeleteModalOpen}
        onDelete={deleteLearnerHandler}
        onCancel={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
      />
    </>
  );
};
