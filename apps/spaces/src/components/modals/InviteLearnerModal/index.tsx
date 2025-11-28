import { FunctionComponent, useState } from "react";
import { Modal, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

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

  const [name, handleName] = useState('');
  const [email, handleEmail] = useState('');

  return (
    <Modal
      isOpen={isModalOpen}
      title={t('modals.invite_learner.title')}
      primaryButtonText={t('buttons.send_invitation')}
      primaryButtonDisabled={!name || name.trim() === "" || !email || email.trim() === ""}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        onConfirm()
        setIsModalOpen(false);
        handleEmail('');
        handleName('');
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false)
        handleEmail('');
        handleName('');
      }}
    >
      <FormContent>
        <InputsContainer>
          <TextInput
            aria-label="name"
            value={name}
            placeholder={t('modals.invite_learner.name_placeholder')}
            onChange={(e) => handleName(e.target.value)}
          />
          <TextInput
            aria-label="email"
            value={email}
            placeholder={t('modals.invite_learner.email_placeholder')}
            onChange={(e) => handleEmail(e.target.value)}
          />
        </InputsContainer>
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
`;