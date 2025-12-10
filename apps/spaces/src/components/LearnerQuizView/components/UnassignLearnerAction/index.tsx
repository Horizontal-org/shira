import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { Body1, Modal, ModalType, useTheme } from "@shira/ui";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { handleHttpError } from "../../../../fetch/handleError";
import { getErrorContent } from "../../../../utils/getErrorContent";
import styled from "styled-components";
import { AssignRequest, unassignFromQuiz } from "../../../../fetch/learner_quiz";

interface Props {
  openErrorModal: (content: string, retry: () => void) => void;
  learners: AssignRequest[];
  onSuccess?: () => void;
}

export const UnassignLearnerAction: FunctionComponent<Props> = ({
  openErrorModal,
  learners,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const unassignQuizToLearner = async () => {
    if (!learners.length) {
      return;
    }

    try {
      const response = await unassignFromQuiz(learners);

      if (response.data.status !== "Error") {
        const message = () => {
          if (learners.length === 1) {
            return t(`success_messages.learner_unassigned`, { count: learners.length });
          }

          return t(`success_messages.learners_unassigned_plural`, { count: learners.length });
        };

        toast.success(message(), { duration: 3000 });
        onSuccess?.();
      }

      if (response.data.status === "Error") {
        const content = getErrorContent("error_messages", "unassign_quiz_failed", response.data.message);

        openErrorModal(content, unassignQuizToLearner);
      }
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "unassign_quiz_failed", e.message);

      openErrorModal(content, unassignQuizToLearner);
    }
  };

  return (
    <>
      <IconButton type="button" onClick={() => setIsConfirmModalOpen(true)}>
        <IoPersonRemoveSharp size={24} color={theme.colors.error9} />
      </IconButton>

      <Modal
        isOpen={isConfirmModalOpen}
        title={t("modals.unassign_learner.title")}
        primaryButtonText={t("buttons.unassign")}
        secondaryButtonText={t("buttons.cancel")}
        type={ModalType.Danger}
        onPrimaryClick={() => {
          setIsConfirmModalOpen(false);
          unassignQuizToLearner();
        }}
        onSecondaryClick={() => setIsConfirmModalOpen(false)}
      >
        <ModalContent>
          <Body1>{t("modals.unassign_learner.subtitle")}</Body1>
        </ModalContent>
      </Modal>
    </>
  );
};

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;
