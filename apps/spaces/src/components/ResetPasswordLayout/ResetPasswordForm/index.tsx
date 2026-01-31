import { FunctionComponent, ReactNode } from "react";
import { Button, TextInput, Form, styled } from "@shira/ui";

interface Props {
  title: string;
  description: ReactNode;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  buttonText: string;
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

export const ResetPasswordForm: FunctionComponent<Props> = ({
  title,
  description,
  newPasswordLabel,
  confirmPasswordLabel,
  buttonText,
  password,
  passwordConfirmation,
  passwordError,
  passwordConfirmationError,
  submitError,
  submitDisabled,
  onPasswordChange,
  onPasswordConfirmationChange,
  onSubmit,
}) => (

  <StyledForm
    title={title}
    description={description}
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
          label={newPasswordLabel}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <FieldError $visible={Boolean(passwordError)}>{passwordError}</FieldError>
      </FieldGroup>
      <FieldGroup>
        <TextInput
          id="reset-confirm-password-input"
          required
          type="password"
          label={confirmPasswordLabel}
          value={passwordConfirmation}
          onChange={(e) => onPasswordConfirmationChange(e.target.value)}
        />
        <FieldError $visible={Boolean(passwordConfirmationError)}>
          {passwordConfirmationError}
        </FieldError>
      </FieldGroup>
      <FormError $visible={Boolean(submitError)}>{submitError}</FormError>
    </PasswordInputsContainer>

    <ButtonContainer>
      <Button
        id="reset-password-confirm-button"
        text={buttonText}
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

const FieldError = styled.div<{ $visible?: boolean }>`
  min-height: 18px;
  color: #d32f2f;
  font-size: 14px;
  line-height: 18px;
  padding-left: 4px;
  margin-top: 8px;
  visibility: ${props => (props.$visible ? "visible" : "hidden")};
`;

const FormError = styled(FieldError)``;

const StyledForm = styled(Form)`
  position: relative;
  z-index: 1;
  text-align: left;
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
