import { FunctionComponent, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, TextInput, Navbar, Link3 } from "@shira/ui";
import { hasRequiredValue, isEmailValid } from "../../utils/validation";
import { confirmPasswordReset, requestPasswordReset } from "../../fetch/password_reset";
import { getErrorContent } from "../../utils/getErrorContent";
import { ResetPasswordForm } from "./ResetPasswordForm";
import {
  BackgroundPattern,
  ButtonContainer,
  Container,
  ContentWrapper,
  InlineErrorMessage,
  InputsContainer,
  StyledForm,
  SuccessInfo,
} from "./styles";

interface Props { }

export const ResetPasswordLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { token: tokenParam } = useParams();

  const token = useMemo(() => {
    if (tokenParam) {
      return tokenParam;
    }
    return new URLSearchParams(search).get("token") ?? "";
  }, [search, tokenParam]);
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
            <ResetPasswordForm
              title={t("reset_password.create_title")}
              description={t("reset_password.create_subtitle")}
              newPasswordLabel={t("reset_password.new_password_placeholder")}
              confirmPasswordLabel={t("reset_password.confirm_password_placeholder")}
              buttonText={t("reset_password.reset_button")}
              password={password}
              passwordConfirmation={passwordConfirmation}
              passwordError={passwordError}
              passwordConfirmationError={passwordConfirmationError}
              submitError={submitError}
              submitDisabled={!hasRequiredValue(password) || !hasRequiredValue(passwordConfirmation)}
              onPasswordChange={setPassword}
              onPasswordConfirmationChange={setPasswordConfirmation}
              onSubmit={handleResetSubmit}
            />
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
