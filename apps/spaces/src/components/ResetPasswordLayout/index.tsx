import { FunctionComponent, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, TextInput, styled, Navbar, Body3, Link3 } from "@shira/ui";
import backgroundSvg from "../../assets/Background.svg";
import { hasRequiredValue, isEmailValid } from "../../utils/validation";
import { confirmPasswordReset, requestPasswordReset } from "../../fetch/password_reset";
import { getErrorContent } from "../../utils/getErrorContent";

interface Props { }

export const ResetPasswordLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();

  const token = useMemo(() => new URLSearchParams(search).get("token") ?? "", [search]);
  const isTokenFlow = Boolean(token);

  const [email, handleEmail] = useState("");
  const [emailError, handleEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [resetComplete, setResetComplete] = useState(false);

  const validateForm = () => {
    let hasError = false;
    if (!hasRequiredValue(email)) {
      handleEmailError(t("reset_password.validation.email_required"));
      hasError = true;
    }
    if (hasRequiredValue(email) && !isEmailValid(email)) {
      handleEmailError(t("reset_password.validation.invalid_email"));
      hasError = true;
    }
    return hasError;
  };

  const validateResetForm = () => {
    let hasError = false;
    if (!hasRequiredValue(password)) {
      setPasswordError(t("reset_password.validation.password_required"));
      hasError = true;
    }
    if (hasRequiredValue(password) && password.length < 8) {
      setPasswordError(t("reset_password.validation.password_min_length"));
      hasError = true;
    }
    if (!hasRequiredValue(passwordConfirmation)) {
      setPasswordConfirmationError(t("reset_password.validation.confirm_password_required"));
      hasError = true;
    }
    if (hasRequiredValue(passwordConfirmation) && password !== passwordConfirmation) {
      setPasswordConfirmationError(t("reset_password.validation.passwords_mismatch"));
      hasError = true;
    }
    return hasError;
  };

  const handleSubmit = async () => {
    handleEmailError("");
    if (validateForm()) {
      return;
    }
    try {
      await requestPasswordReset(email);
    } catch (error) {
      console.error("Failed to request password reset", error);
    } finally {
      setSubmitted(true);
    }
  };

  const handleResetSubmit = async () => {
    setPasswordError("");
    setPasswordConfirmationError("");
    setSubmitError("");

    if (validateResetForm()) {
      return;
    }

    try {
      await confirmPasswordReset(token, password);
      setResetComplete(true);
    } catch (error) {
      const content = getErrorContent("error_messages", "something_went_wrong", error.message);
      setSubmitError(content);
    }
  };

  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: "Log in", createSpace: "" }}
        onNavigate={() => navigate("/login")}
      />
      <ContentWrapper>
        <BackgroundPattern />
        {isTokenFlow ? (
          resetComplete ? (
            <StyledForm
              title={t("reset_password.reset_success_title")}
              description={t("reset_password.reset_success_description")}
            >
              <ButtonContainer>
                <Button
                  id="reset-success-login-button"
                  text={t("reset_password.reset_success_button")}
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                />
              </ButtonContainer>
            </StyledForm>
          ) : (
            <StyledForm
              title={t("reset_password.create_title")}
              description={t("reset_password.create_subtitle")}
              onSubmit={(e) => {
                e.preventDefault();
                handleResetSubmit();
              }}
            >
              <PasswordInputsContainer>
                <TextInput
                  id="reset-new-password-input"
                  required
                  type="password"
                  label={t("reset_password.new_password_placeholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <InlineErrorMessage>{passwordError}</InlineErrorMessage>}
                <TextInput
                  id="reset-confirm-password-input"
                  required
                  type="password"
                  label={t("reset_password.confirm_password_placeholder")}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {passwordConfirmationError && (
                  <InlineErrorMessage>{passwordConfirmationError}</InlineErrorMessage>
                )}
                {submitError && <InlineErrorMessage>{submitError}</InlineErrorMessage>}
              </PasswordInputsContainer>

              <ButtonContainer>
                <Button
                  id="reset-password-confirm-button"
                  text={t("reset_password.reset_button")}
                  type="primary"
                  disabled={!hasRequiredValue(password) || !hasRequiredValue(passwordConfirmation)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleResetSubmit();
                  }}
                />
              </ButtonContainer>
            </StyledForm>
          )
        ) : submitted ? (
          <StyledForm
            title={t("reset_password.success_title")}
            description={
              <Trans
                i18nKey="reset_password.success_description"
                values={{ email }}
                components={{ strong: <strong /> }}
              />
            }
          >
            <SuccessInfo>
              <Trans
                i18nKey="reset_password.success_info"
                values={{ contact_email: "contact@wearehorizontal.org" }}
                components={[
                  <Link3 key="contact-email" href="mailto:contact@wearehorizontal.org" />
                ]}
              />
            </SuccessInfo>
          </StyledForm>
        ) : (
          <StyledForm
            title={t("reset_password.title")}
            description={t("reset_password.subtitle")}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <InputsContainer>
              <TextInput
                id="reset-email-input"
                required
                label={t("reset_password.email_placeholder")}
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
              />
              {emailError && <InlineErrorMessage>{emailError}</InlineErrorMessage>}
            </InputsContainer>

            <ButtonContainer>
              <Button
                id="reset-password-button"
                text={t("reset_password.send_button")}
                type="primary"
                disabled={!hasRequiredValue(email) || !isEmailValid(email)}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
            </ButtonContainer>
          </StyledForm>
        )}
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  position: relative;
  z-index: 1;
`;

const BackgroundPattern = styled.div`
  background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PasswordInputsContainer = styled(InputsContainer)`
  gap: 24px;
`;

const InlineErrorMessage = styled.div`
  color: ${props => props.theme.colors.red7};
`;

const SuccessInfo = styled(Body3)`
  margin-top: 16px;
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

const BackLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
