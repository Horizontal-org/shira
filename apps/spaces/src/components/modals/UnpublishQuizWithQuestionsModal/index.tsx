import { FunctionComponent } from "react";
import { Body1, Modal } from "@shira/ui";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const UnpublishQuizWithQuestionsModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  onCancel
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="unpublish-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.unpublish_quiz_with_questions.title')}
      primaryButtonText={t('modals.unpublish_quiz_with_questions.confirm')}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        setIsModalOpen(false);
        onConfirm();
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false);
        onCancel?.();
      }}
    >
      <FormContent>
        <Body1>{t('modals.unpublish_quiz_with_questions.message')}</Body1>
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;
