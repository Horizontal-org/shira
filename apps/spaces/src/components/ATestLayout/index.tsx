import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Body1, Modal, ModalType } from "@shira/ui";
import { getContactUsLayout } from "../../utils/getErrorContent";
import { AssignLearnerAction } from "./AssignLearnerAction";
import { UnassignLearnerAction } from "./UnassignLearnerAction";
import { DeleteLearnerAction } from "./DeleteLearnerAction";

interface Props { }

export const ATestLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
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
            {getContactUsLayout(errorMessage)}
          </Body1>
        </FormContent>
      </Modal>
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

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;