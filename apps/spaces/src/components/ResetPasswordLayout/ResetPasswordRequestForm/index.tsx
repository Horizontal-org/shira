import { FunctionComponent } from "react";
import { Button, Form, TextInput, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  email: string;
  emailError: string;
  submitError: string;
  submitDisabled: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}

export const ResetPasswordRequestForm: FunctionComponent<Props> = ({
  email,
  emailError,
  submitError,
  submitDisabled,
  onEmailChange,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <StyledForm
      title={t("reset_password.title")}
      description={t("reset_password.subtitle")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputsContainer>
        <TextInput
          id="reset-email-input"
          required
          label={t("reset_password.email_placeholder")}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        {emailError && <InlineErrorMessage>{emailError}</InlineErrorMessage>}
        {submitError && <InlineErrorMessage>{submitError}</InlineErrorMessage>}
      </InputsContainer>

      <ButtonContainer>
        <Button
          id="reset-password-button"
          text={t("reset_password.send_button")}
          type="primary"
          disabled={submitDisabled}
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        />
      </ButtonContainer>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  position: relative;
  z-index: 1;
  text-align: left;
  margin-bottom: 32px;
  gap: 16px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InlineErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error7};
  font-size: 14px;
  margin-top: -12px;
  padding-left: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;

    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
