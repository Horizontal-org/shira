import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@shira/ui";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const UnpublishQuizOnDeleteModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  onCancel
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="unpublish-quiz-on-delete-modal"
      isOpen={isModalOpen}
      title={t('modals.unpublish_quiz_on_delete.title')}
      primaryButtonText={t('modals.unpublish_quiz_on_delete.confirm')}
      secondaryButtonText={t('buttons.cancel')}
      type={ModalType.Danger}
      onPrimaryClick={() => {
        setIsModalOpen(false);
        onConfirm();
      }}
      onSecondaryClick={onCancel}
    >
      <FormContent>
        <Body1>
          {t('modals.unpublish_quiz_on_delete.message')}
        </Body1>
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;
