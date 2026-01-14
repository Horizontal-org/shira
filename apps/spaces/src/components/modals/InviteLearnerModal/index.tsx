import { FunctionComponent, useEffect, useState } from "react";
import { Body1, defaultTheme, Modal, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import toast from "react-hot-toast";
import { inviteLearner } from "../../../fetch/learner";
import { handleHttpError } from "../../../fetch/handleError";
import { getErrorContent } from "../../../utils/getErrorContent";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onInviteSuccess: () => void;
  openErrorModal: (content: string, retry: () => void) => void;
}

export const InviteLearnerModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  openErrorModal,
  onInviteSuccess,
}) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/;
  const verifyEmailPattern = (value: string) => EMAIL_REGEX.test(value);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [showAlreadyExistsError, setShowAlreadyExistsError] = useState(false);

  const isNameEmpty = !name.trim();
  const isEmailEmpty = !email.trim();

  const showInvalidEmailError = !isEmailEmpty && !emailIsValid;

  const primaryButtonDisabled = isLoading || isNameEmpty || isEmailEmpty || !emailIsValid || showAlreadyExistsError;

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

  const sendInvitation = async (values: { name: string; email: string }) => {
    setIsLoading(true);
    try {
      await inviteLearner(values.name, values.email);
      toast.success(t(`success_messages.learner_invitation_sent`), { duration: 3000 });
      setIsModalOpen(false);
      onInviteSuccess();
    } catch (error) {
      const e = handleHttpError(error);
      if (e.message === "learner_already_exists") {
        setShowAlreadyExistsError(true);
        return;
      }
      const content = getErrorContent("error_messages", "invite_learner_failed", e.message);
      openErrorModal(content, () => sendInvitation(values));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrimaryClick = async () => {
    if (isNameEmpty || isEmailEmpty || !emailIsValid) {
      return;
    }

    const values = { name, email };
    await sendInvitation(values);
  };

  useEffect(() => {
    if (!isModalOpen) {
      resetForm();
    }
  }, [isModalOpen]);

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
      primaryButtonDisabled={primaryButtonDisabled}
      secondaryButtonText={t("buttons.cancel")}
      onPrimaryClick={handlePrimaryClick}
      onSecondaryClick={handleClose}
    >
      <FormContent>
        <Body1>{t("modals.invite_learner.subtitle")}</Body1>

        <InputsContainer>
          <TextInput
            id="learner-name"
            type="text"
            value={name}
            placeholder={t("modals.invite_learner.name_placeholder")}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <EmailField>
            <TextInput
              id="learner-email"
              type="email"
              value={email}
              placeholder={t("modals.invite_learner.email_placeholder")}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
            />

            <ErrorContainer role="alert" aria-live="polite">
              {showInvalidEmailError && (
                <ErrorText>{t("error_messages.invalid_email")}</ErrorText>
              )}

              {showAlreadyExistsError && !isEmailEmpty && emailIsValid && (
                <ErrorText>{t("error_messages.learner_already_exists")}</ErrorText>
              )}
            </ErrorContainer>
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

const ErrorContainer = styled.div`
  min-height: 40px;
  padding: 0 10px;
`;

const ErrorText = styled.p`
  color: ${defaultTheme.colors.error7};
  padding: 4px 10px;
  gap: 10px;
  margin-top: 4px;
  font-size: 11px;
`;
