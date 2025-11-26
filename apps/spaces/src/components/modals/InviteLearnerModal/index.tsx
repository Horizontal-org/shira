import { FunctionComponent } from "react";
import { Modal, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { title } from "process";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: () => void
}

export const InviteLearnerModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isModalOpen}
      title={t('modals.invite_learner.title')}
      primaryButtonText={t('buttons.send_invitation')}
      primaryButtonDisabled={true}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        onConfirm()
        setIsModalOpen(false);
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false)
      }}
    >
      <FormContent>
        <TextInput
          label="Learner name"
          value={t('modals.invite_learner.name_placeholder')}
          onChange={() => { }}
        />
      </FormContent>
      <FormContent>
        <TextInput
          label="Learner email"
          value={t('modals.invite_learner.email_placeholder')}
          onChange={() => { }}
        />
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;