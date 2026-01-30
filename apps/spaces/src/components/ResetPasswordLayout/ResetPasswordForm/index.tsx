import { FunctionComponent, ReactNode } from "react";
import { Button, TextInput } from "@shira/ui";
import { ButtonContainer, InlineErrorMessage, StyledForm } from "../styles";
import styled from "styled-components";

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
      <TextInput
        id="reset-new-password-input"
        required
        type="password"
        label={newPasswordLabel}
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      {passwordError && <InlineErrorMessage>{passwordError}</InlineErrorMessage>}
      <TextInput
        id="reset-confirm-password-input"
        required
        type="password"
        label={confirmPasswordLabel}
        value={passwordConfirmation}
        onChange={(e) => onPasswordConfirmationChange(e.target.value)}
      />
      {passwordConfirmationError && (
        <InlineErrorMessage>{passwordConfirmationError}</InlineErrorMessage>
      )}
      {submitError && <InlineErrorMessage>{submitError}</InlineErrorMessage>}
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