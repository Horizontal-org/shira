import { FunctionComponent, useState } from "react";
import toast from "react-hot-toast";
import { invite } from "../../fetch/learner";
import { assignToQuiz } from "../../fetch/learner";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handleHttpError } from "../../fetch/handleError";
import { EmailIcon, Button } from "@shira/ui";
import { FiDownload } from "react-icons/fi";
import { InviteLearnerModal } from "../modals/InviteLearnerModal";

interface Props { }

export const ATestLayout: FunctionComponent<Props> = () => {

  enum ViewResult { Ok, Error };

  const [view, setView] = useState<ViewResult>(null);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);

  const { t } = useTranslation();

  const inv = async () => {
    try {
      await invite("22@gmail.com", "ffffff");
      setView(ViewResult.Ok);
      toast.success("OK", { duration: 3000 });
    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const key = e.code ?? e.message ?? "";

      toast.error(
        t(`error_messages.${key}`, { defaultValue: "Failed to invite" }), { duration: 3000 }
      );
    }
  };

  const assQuiz = async () => {
    try {
      const response = await assignToQuiz([{ learnerId: 1, email: "fredziaga@gmail.com", quizId: 79 }]);

      if (response.data.status !== "Error") {
        setView(ViewResult.Ok);
        setIsInvitationModalOpen(true);
      }

      if (response.data.status === "Error") {
        setView(ViewResult.Error);
        toast.error(t(`error_messages.${response.data.message}`) || "Failed to assign");
      }

    } catch (error) {
      setView(ViewResult.Error);

      const e = handleHttpError(error);
      const key = e.code ?? e.message ?? "";

      toast.error(
        t(`error_messages.${key}`, { defaultValue: "Failed to assign" }), { duration: 3000 }
      );
    }
  };

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
          leftIcon={<FiDownload />} //TODO add download icon to shira ui
          onClick={assQuiz}
        />
      </ButtonContainer>

      <ModalWrapper>
        <InviteLearnerModal
          isModalOpen={isInvitationModalOpen}
          setIsModalOpen={setIsInvitationModalOpen}
          onConfirm={inv}
        />
      </ModalWrapper>
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