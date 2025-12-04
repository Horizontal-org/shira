import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { EmailIcon, Button } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { InviteLearnerModal } from "../modals/InviteLearnerModal";
import { inviteLearner } from "../../fetch/learner";
import { handleHttpError } from "../../fetch/handleError";
import { getErrorContent } from "../../utils/getErrorContent";
import styled from "styled-components";

interface Props {
  openErrorModal: (content: string, retry: () => void) => void;
}

export const InviteLearnerAction: FunctionComponent<Props> = ({ openErrorModal }) => {
  const { t } = useTranslation();
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);

  const invite = async (name: string, email: string) => {
    try {
      await inviteLearner(name, email);
      toast.success(t(`success_messages.learner_invitation_sent`), { duration: 3000 });
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "invite_learner_failed", e.message);

      if (e.message === "learner_already_exists") {
        throw error;
      }

      openErrorModal(content, () => invite(name, email));
    }
  };

  return (
    <ActionContainer>
      <Button
        text="Invite learner to space"
        type="outline"
        leftIcon={<EmailIcon />}
        onClick={() => setIsInvitationModalOpen(true)}
      />

      <InviteLearnerModal
        isModalOpen={isInvitationModalOpen}
        setIsModalOpen={setIsInvitationModalOpen}
        onConfirm={(name, email) => invite(name, email)}
      />
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;