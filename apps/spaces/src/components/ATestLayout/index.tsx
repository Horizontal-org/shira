import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { LearnerErrorModal } from "../modals/ErrorModal";
import { AssignLearnerAction } from "./AssignLearnerAction";
import { UnassignLearnerAction } from "./UnassignLearnerAction";

interface Props { }

export const ATestLayout: FunctionComponent<Props> = () => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryAction, setRetryAction] = useState<(() => void) | null>(null);

  const openErrorModal = (content: string, retry: () => void) => {
    setErrorMessage(content);
    setRetryAction(() => retry);
    setIsErrorModalOpen(true);
  };

  const handleErrorModalCancel = () => {
    setIsErrorModalOpen(false);
    setRetryAction(null);
    setErrorMessage(null);
  };

  const handleErrorModalRetry = () => {
    setIsErrorModalOpen(false);
    if (retryAction) {
      retryAction();
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <AssignLearnerAction openErrorModal={openErrorModal} />
        <UnassignLearnerAction openErrorModal={openErrorModal} />
      </ButtonContainer>

      <LearnerErrorModal
        isOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        onRetry={handleErrorModalRetry}
        onCancel={handleErrorModalCancel}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;
