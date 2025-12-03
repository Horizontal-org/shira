import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { assignToQuiz, deleteLearners, inviteLearner, unassignFromQuiz } from "../../fetch/learner";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handleHttpError } from "../../fetch/handleError";
import { EmailIcon, Button, Body1, Modal, ModalType } from "@shira/ui";
import { FiDownload } from "react-icons/fi";
import { InviteLearnerModal } from "../modals/InviteLearnerModal";
import { DeleteModal } from "../modals/DeleteModal";
import { getContactUsLayout, getErrorContent } from "../../utils/getErrorContent";
import { FaPersonCircleMinus } from "react-icons/fa6";

interface Props { }

export const ATestLayout: FunctionComponent<Props> = () => {

  enum ViewResult { Ok, Error };

  const [view, setView] = useState<ViewResult>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  function handleSelectLearner() { setSelectedIds([10]); } // Mock of learners

  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteErrorCode, setInviteErrorCode] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [retryAction, setRetryAction] = useState<(() => void) | null>(null);

  //TODO loading state

  const { t } = useTranslation();

  const openErrorModal = (content: string, retry: () => void) => {
    setErrorMessage(content);
    setRetryAction(() => retry);
    setIsErrorModalOpen(true);
  };

  const invite = async (name: string, email: string) => {
    try {
      await inviteLearner(name, email);
      setView(ViewResult.Ok);

      toast.success(t(`success_messages.learner_invitation_sent`), { duration: 3000 });
    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "invite_learner_failed", e.message);

      if (e.message === "learner_already_exists") {
        throw error;
      }

      openErrorModal(content, () => invite(name, email));
    }
  };

  const assignQuizToLearner = async () => {
    try {
      const learners = [{ learnerId: 9, quizId: 2 }, { learnerId: 8, quizId: 2 }]; // Mock of learners
      const response = await assignToQuiz(learners);

      if (response.data.status !== "Error") {
        setView(ViewResult.Ok);

        const message = () => {
          if (learners.length === 1) {
            return t(`success_messages.learner_assigned`, { count: learners.length });
          } else {
            return t(`success_messages.learners_assigned_plural`, { count: learners.length });
          }
        }

        toast.success(message, { duration: 3000 });
      }

      if (response.data.status === "Error") {
        setView(ViewResult.Error);

        const content = getErrorContent("error_messages", "assign_quiz_failed", response.data.message);

        openErrorModal(content, assignQuizToLearner);
      }
    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "assign_quiz_failed", e.message);

      openErrorModal(content, assignQuizToLearner);
    }
  };

  const unassignQuizToLearner = async () => {
    try {
      const learners = [{ learnerId: 9, quizId: 2 }, { learnerId: 8, quizId: 2 }]; // Mock of learners
      const response = await unassignFromQuiz(learners);

      if (response.data.status !== "Error") {
        setView(ViewResult.Ok);

        const message = () => {
          if (learners.length === 1) {
            return t(`success_messages.learner_unassigned`, { count: learners.length });
          } else {
            return t(`success_messages.learners_unassigned_plural`, { count: learners.length });
          }
        }

        toast.success(message, { duration: 3000 });
      }

      if (response.data.status === "Error") {
        setView(ViewResult.Error);
        const content = getErrorContent("error_messages", "unassign_quiz_failed", response.data.message);

        openErrorModal(content, unassignQuizToLearner);
      }
    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "unassign_quiz_failed", e.message);

      openErrorModal(content, unassignQuizToLearner);
    }
  };

  const deleteLearner = async () => {
    handleSelectLearner();

    try {
      await deleteLearners(selectedIds);
      setView(ViewResult.Ok);
      toast.success(t(`success_messages.learner_deleted`), { duration: 3000 });
    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "delete_learner_failed", e.message);

      openErrorModal(content, deleteLearner);
    }
  }

  const handleErrorModalCancel = () => {
    setIsErrorModalOpen(false);
    setRetryAction(null);
    setErrorMessage(null);
  };

  const handleErrorModalRetry = () => {
    setIsErrorModalOpen(false);
    if (retryAction) { retryAction(); }
  };

  const handleErrorContent = () => {
    return getContactUsLayout(errorMessage);
  }

  return (
    <Container>
      <ButtonContainer>
        <Button
          text="Invite learner to space"
          type="outline"
          leftIcon={<EmailIcon />}
          onClick={() => setIsInvitationModalOpen(true)}
        />
        <Button
          text="Assign to quiz"
          type="outline"
          leftIcon={<FiDownload />}
          onClick={assignQuizToLearner}
        />
        <Button
          text="Unassign to quiz"
          type="outline"
          leftIcon={<FaPersonCircleMinus />}
          onClick={unassignQuizToLearner}
        />
        <Button
          text="Delete learner"
          type="outline"
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </ButtonContainer>

      <ModalWrapper>
        <InviteLearnerModal
          isModalOpen={isInvitationModalOpen}
          setIsModalOpen={setIsInvitationModalOpen}
          onConfirm={(name, email) => invite(name, email)}
        />
      </ModalWrapper>

      <DeleteModal
        title={t('modals.delete_learner.title')}
        content={
          <div>
            {t('modals.delete_learner.subtitle')}
          </div>
        }
        setIsModalOpen={setIsDeleteModalOpen}
        onDelete={deleteLearner}
        onCancel={() => setIsDeleteModalOpen(false)}
        isModalOpen={isDeleteModalOpen}
      />

      <Modal
        isOpen={isErrorModalOpen}
        title={t('error_messages.something_went_wrong')}
        primaryButtonText={t('buttons.try_again')}
        secondaryButtonText={t('buttons.cancel')}
        type={ModalType.Danger}
        onPrimaryClick={handleErrorModalRetry}
        onSecondaryClick={handleErrorModalCancel}
      >
        <FormContent>
          <Body1>
            {handleErrorContent()}
          </Body1>
        </FormContent>
      </Modal>
    </Container >
  )
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
`;

const ModalWrapper = styled.div`
  width: 1000px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;