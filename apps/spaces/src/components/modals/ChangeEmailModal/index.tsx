import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, TextInput } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handleHttpError } from "../../../fetch/handleError";
import { getErrorContent } from "../../../utils/getErrorContent";
import { hasRequiredValue, isEmailValid } from "../../../utils/validation";
import { ACCOUNT_SETTINGS_EMAIL_MAX_LENGTH } from "../../../utils/inputLimits";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onSave: (email: string) => Promise<void>;
}

export const ChangeEmailModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onSave,
}) => {
  const { t } = useTranslation();
  const [newEmail, setNewEmail] = useState("");
  const [requestSubmitError, setRequestSubmitError] = useState("");

  const isNewEmailEmpty = !hasRequiredValue(newEmail);
  const emailIsValidValue = isNewEmailEmpty || isEmailValid(newEmail);
  const emailSupportingText = !isNewEmailEmpty && !emailIsValidValue
    ? t("error_messages.invalid_email")
    : requestSubmitError;

  const isNewEmailOverLimit = newEmail.length > ACCOUNT_SETTINGS_EMAIL_MAX_LENGTH;
  const disabledSave = isNewEmailEmpty || !emailIsValidValue || isNewEmailOverLimit;

  useEffect(() => {
    if (!isModalOpen) {
      setNewEmail("");
      setRequestSubmitError("");
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setRequestSubmitError("");
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (disabledSave) { return; }

    setRequestSubmitError("");

    try {
      await onSave(newEmail.trim());
    } catch (error) {
      const { message } = handleHttpError(error);
      setRequestSubmitError(t(getErrorContent("error_messages", "something_went_wrong", message)));
    }
  };

  return (
    <Modal
      id="change-email-modal"
      isOpen={isModalOpen}
      title={t('modals.change_email.title')}
      primaryButtonText={t('buttons.save')}
      primaryButtonDisabled={disabledSave}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={handleSave}
      onSecondaryClick={handleClose}
      onClose={handleClose}
    >
      <ModalContent>
        <Body1>{t('modals.change_email.subtitle')}</Body1>

        <TextInput
          id="change-email-input"
          type="email"
          value={newEmail}
          label={t('modals.change_email.input_placeholder')}
          onChange={(e) => {
            setNewEmail(e.target.value);
            if (requestSubmitError) {
              setRequestSubmitError("");
            }
          }}
          showCharacterCount={true}
          maxLength={ACCOUNT_SETTINGS_EMAIL_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          errorText={emailSupportingText}
        />
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
