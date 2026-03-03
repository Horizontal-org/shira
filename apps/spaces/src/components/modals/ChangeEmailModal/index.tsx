import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { hasRequiredValue, isEmailValid } from "../../../utils/validation";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onSave?: (email: string) => Promise<void>;
}

export const ChangeEmailModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onSave
}) => {
  const { t } = useTranslation();
  const [newEmail, setNewEmail] = useState("");

  const isNewEmailEmpty = !hasRequiredValue(newEmail);
  const emailIsValidValue = isNewEmailEmpty || isEmailValid(newEmail);
  const disableSave = isNewEmailEmpty || !emailIsValidValue;

  useEffect(() => {
    if (!isModalOpen) {
      setNewEmail("");
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (disableSave) {
      return;
    }

    await onSave?.(newEmail.trim());
    setIsModalOpen(false);
  };

  return (
    <Modal
      id="change-email-modal"
      isOpen={isModalOpen}
      title={t('modals.change_email.title')}
      primaryButtonText={t('buttons.save')}
      primaryButtonDisabled={disableSave}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={handleSave}
      onSecondaryClick={handleClose}
      onClose={handleClose}
    >
      <ModalContent>
        <Body1>{t('modals.change_email.subtitle')}</Body1>

        <InputBlock>
          <TextInput
            id="change-email-input"
            type="email"
            value={newEmail}
            label={t('modals.change_email.input_placeholder')}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </InputBlock>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 180px;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
