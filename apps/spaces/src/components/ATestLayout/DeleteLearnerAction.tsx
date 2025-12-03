import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { deleteLearners } from "../../fetch/learner";
import { handleHttpError } from "../../fetch/handleError";
import { getErrorContent } from "../../utils/getErrorContent";
import { DeleteModal } from "../modals/DeleteModal";
import styled from "styled-components";

interface Props {
  openErrorModal: (content: string, retry: () => void) => void;
}

export const DeleteLearnerAction: FunctionComponent<Props> = ({ openErrorModal }) => {
  const { t } = useTranslation();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleSelectLearner() {
    setSelectedIds([10]); // Mock of learners
  }

  const deleteLearnerHandler = async () => {
    handleSelectLearner();

    try {
      await deleteLearners(selectedIds);
      toast.success(t(`success_messages.learner_deleted`), { duration: 3000 });
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "delete_learner_failed", e.message);

      openErrorModal(content, deleteLearnerHandler);
    }
  };

  return (
    <ActionContainer>
      <Button
        text="Delete learner"
        type="outline"
        onClick={() => setIsDeleteModalOpen(true)}
      />

      <DeleteModal
        title={t('modals.delete_learner.title')}
        content={
          <div>
            {t('modals.delete_learner.subtitle')}
          </div>
        }
        setIsModalOpen={setIsDeleteModalOpen}
        onDelete={deleteLearnerHandler}
        onCancel={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
      />
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
