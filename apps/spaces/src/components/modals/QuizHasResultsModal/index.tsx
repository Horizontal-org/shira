import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@shira/ui";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


interface Props {
  // quiz: Quiz
  title: string;
  content: string | React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onContinue: () => void
  onCancel: () => void
}

export const QuizHasResultsModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onContinue,
  onCancel,
  title = '',
  content = ''
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      id="quiz-has-results-modal"
      isOpen={isModalOpen}
      title={title}
      primaryButtonText={t('buttons.continue')}
      secondaryButtonText={t('buttons.cancel')}
      type={ModalType.Danger}
      onPrimaryClick={() => {
        setIsModalOpen(false);
        onContinue()
      }}
      onSecondaryClick={onCancel}
    >
      <FormContent>
        <Body1>
          {content}
        </Body1>
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;