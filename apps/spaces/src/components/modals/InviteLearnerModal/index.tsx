import { FunctionComponent, useState } from "react";
import { defaultTheme, Modal, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onConfirm: (name: string, email: string) => void;
  isLoading?: boolean;
}

export const InviteLearnerModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [showAlreadyExistsError, setShowAlreadyExistsError] = useState(false);

  const isNameEmpty = !name.trim();
  const isEmailEmpty = !email.trim();
  const showInvalidEmailError = !isEmailEmpty && !emailIsValid;

  const verifyEmailPattern = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const resetForm = () => {
    setName("");
    setEmail("");
    setEmailIsValid(true);
    setShowAlreadyExistsError(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setShowAlreadyExistsError(false);

    if (!value.trim()) {
      setEmailIsValid(true);
      return;
    }

    setEmailIsValid(verifyEmailPattern(value));
  };

  const handlePrimaryClick = async () => {
    try {
      await Promise.resolve(onConfirm(name, email));
    } catch {
      setShowAlreadyExistsError(true);
    }
  };

  return (
    <Modal
      id="invite-learner-modal"
      size="medium"
      isOpen={isModalOpen}
      title={t("modals.invite_learner.title")}
      primaryButtonText={
        isLoading
          ? t("loading_messages.sending_invitation")
          : t("buttons.send_invitation")
      }
      primaryButtonDisabled={
        isLoading || isNameEmpty || isEmailEmpty || !emailIsValid
      }
      secondaryButtonText={t("buttons.cancel")}
      onPrimaryClick={handlePrimaryClick}
      onSecondaryClick={handleClose}
    >
      <FormContent>
        <InputsContainer>
          <TextInput
            id="learner-name"
            value={name}
            placeholder={t("modals.invite_learner.name_placeholder")}
            onChange={(e) => setName(e.target.value)}
          />

          <EmailField>
            <TextInput
              id="learner-email"
              type="email"
              value={email}
              placeholder={t("modals.invite_learner.email_placeholder")}
              onChange={(e) => handleEmailChange(e.target.value)}
            />

            {showInvalidEmailError && (
              <ErrorText
                id="learner-email-error"
                role="alert"
                aria-live="polite"
              >
                {t("error_messages.invalid_email")}
              </ErrorText>
            )}

            {!isEmailEmpty && emailIsValid && showAlreadyExistsError && (
              <ErrorText
                id="learner-already-exists-error"
                role="alert"
                aria-live="polite"
              >
                {t("error_messages.learner_already_exists")}
              </ErrorText>
            )}
          </EmailField>
        </InputsContainer>
      </FormContent>
    </Modal>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;

  & > * {
    flex: 1;
  }
`;

const EmailField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ErrorText = styled.p`
  color: ${defaultTheme.colors.error7};
  padding: 4px 10px;
  gap: 10px;
  margin-top: 4px;
  font-size: 11px;
`;