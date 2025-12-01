import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { assignToQuiz, deleteLearners, inviteLearner } from "../../fetch/learner";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handleHttpError } from "../../fetch/handleError";
import { EmailIcon, Button } from "@shira/ui";
import { FiDownload } from "react-icons/fi";
import { InviteLearnerModal } from "../modals/InviteLearnerModal";
import { DeleteModal } from "../modals/DeleteModal";

interface Props { }

export const ATestLayout: FunctionComponent<Props> = () => {

  enum ViewResult { Ok, Error };

  const [view, setView] = useState<ViewResult>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  function handleSelectLearner() { setSelectedIds([1, 2]); } // Mock of learners

  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { t } = useTranslation();

  const invite = async (name: string, email: string) => {
    try {
      await inviteLearner(name, email);
      setView(ViewResult.Ok);

      //TODO replace toast with modal
      toast.success(t(`success_messages.learner_invitation_sent`), { duration: 3000 });
    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const key = e.message ?? "Failed to invite";

      toast.error(
        t(`error_messages.${key}`), { duration: 3000 }
      );
    }
  };

  const assignQuizToLearner = async () => {
    handleSelectLearner();

    try {
      const response = await assignToQuiz([{ learnerId: 1, quizId: 79 }]);

      if (response.data.status !== "Error") {
        setView(ViewResult.Ok);
        setIsInvitationModalOpen(true);
      }

      if (response.data.status === "Error") {
        setView(ViewResult.Error);
        const message = t(`error_messages.${response.data.message}`, { defaultValue: "Failed to assign" });
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const message = t(`error_messages.${e.message}`, { defaultValue: "Failed to assign" });

      toast.error(message, { duration: 3000 });
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

      const message = t(`error_messages.${e.message}`, { defaultValue: "Failed to delete" });

      //TODO replace toast with modal
      toast.error(message, { duration: 3000 });
    }
  }

  return (
    <Container>
      <ButtonContainer>
        <Button
          text="Invite user to space"
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
        onCancel={() => { setIsDeleteModalOpen(false) }}
        isModalOpen={isDeleteModalOpen}
      />
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