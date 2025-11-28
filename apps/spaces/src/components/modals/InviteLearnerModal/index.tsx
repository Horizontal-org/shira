import { FunctionComponent, useState } from "react";
import { defaultTheme, Modal, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: (name: string, email: string) => void
}

export const InviteLearnerModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm
}) => {

  const { t } = useTranslation();

  const [name, handleName] = useState('');
  const [email, handleEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <Modal
      isOpen={isModalOpen}
      title={t('modals.invite_learner.title')}
      primaryButtonText={t('buttons.send_invitation')}
      primaryButtonDisabled={
        !name || name.trim() === "" ||
        !email || email.trim() === "" ||
        !emailIsValid
      }
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        onConfirm(name, email);
        setIsModalOpen(false);
        setEmailIsValid(true);
        handleEmail('');
        handleName('');
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false)
        setEmailIsValid(true);
        handleEmail('');
        handleName('');
      }}
    >
      <FormContent>
        <InputsContainer>
          <TextInput
            id="learner_name"
            value={name}
            placeholder={t('modals.invite_learner.name_placeholder')}
            onChange={(e) => handleName(e.target.value)}
          />

          <EmailField>
            <TextInput
              id="learner_email"
              type="email"
              value={email}
              placeholder={t('modals.invite_learner.email_placeholder')}
              onChange={(e) => {
                const value = e.target.value;
                handleEmail(value);
                if (value.trim() === '') {
                  setEmailIsValid(true);
                  return;
                }
                setEmailIsValid(isValidEmail(value));
              }}
              aria-invalid={!emailIsValid}
              aria-describedby="learner-email-error"
            />

            {!emailIsValid && email.trim() !== '' && (
              <ErrorText
                id="learner-email-error"
                role="alert"
                aria-live="polite"
              >
                {t('error_messages.invalid_email')}
              </ErrorText>
            )}
          </EmailField>
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

  & > * {
    flex: 1;
  }
`;

const EmailField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 56px;
`;

const ErrorText = styled.p`
  color: ${defaultTheme.colors.error7};
  padding: 4px 10px;
  gap: 10px;
  margin-top: 4px;
  font-size: 11px;
`;
