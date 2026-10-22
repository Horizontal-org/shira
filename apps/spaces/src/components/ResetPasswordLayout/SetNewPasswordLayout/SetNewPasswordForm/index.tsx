import { FunctionComponent } from "react";
import { Button, TextInput, Form, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

interface Props {
  password: string;
  passwordConfirmation: string;
  passwordError: string;
  passwordConfirmationError: string;
  submitError: string;
  submitDisabled: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmationChange: (value: string) => void;
  onSubmit: () => void;
}

export const SetNewPasswordForm: FunctionComponent<Props> = ({
  password,
  passwordConfirmation,
  passwordError,
  passwordConfirmationError,
  submitError,
  submitDisabled,
  onPasswordChange,
  onPasswordConfirmationChange,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <StyledForm
      title={t("reset_password.create_title")}
      description={t("reset_password.create_subtitle")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <PasswordInputsContainer>
        <FieldGroup>
          <TextInput
            id="reset-new-password-input"
            required
            type="password"
            label={t("reset_password.new_password_placeholder")}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            errorText={passwordError}
          />
        </FieldGroup>
        <FieldGroup>
          <TextInput
            id="reset-confirm-password-input"
            required
            type="password"
            label={t("reset_password.confirm_password_placeholder")}
            value={passwordConfirmation}
            onChange={(e) => onPasswordConfirmationChange(e.target.value)}
            errorText={passwordConfirmationError}
          />
        </FieldGroup>
        <FormError $visible={Boolean(submitError)}>{submitError}</FormError>
      </PasswordInputsContainer>

      <ButtonContainer>
        <Button
          id="reset-password-confirm-button"
          text={t("reset_password.reset_button")}
          type="primary"
          disabled={submitDisabled}
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        />
      </ButtonContainer>
    </StyledForm>
  )
};

const PasswordInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FormError = styled.div<{ $visible?: boolean }>`
  min-height: 18px;
  color: ${props => props.theme.colors.error7};
  font-size: 14px;
  line-height: 18px;
  padding-inline-start: 4px;
  margin-top: 8px;
  visibility: ${props => (props.$visible ? "visible" : "hidden")};
`;

const StyledForm = styled(Form)`
  position: relative;
  z-index: 1;
  text-align: start;
  margin-bottom: 32px;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;

    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
