import { FunctionComponent, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Body3, Form, Link3, Navbar, styled } from "@shira/ui";
import toast from "react-hot-toast";
import { hasRequiredValue, isEmailValid } from "../../utils/validation";
import { confirmPasswordReset, requestPasswordReset, validatePasswordResetToken } from "../../fetch/password_reset";
import { handleHttpError } from "../../fetch/handleError";
import { getErrorContent } from "../../utils/getErrorContent";
import { useStore } from "../../store";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ResetPasswordRequestForm } from "./ResetPasswordRequestForm";
import backgroundSvg from "../../assets/Background.svg";
import { InvitationExpiredLayout } from "../InvitationExpiredLayout";

export const ResetPasswordLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const { search } = useLocation();
  const { token: tokenParam } = useParams();

  const token = tokenParam ?? new URLSearchParams(search).get("token") ?? "";

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [requestSubmitError, setRequestSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [resetTokenExpired, setResetTokenExpired] = useState(false);
  const getTranslatedError = (message?: string) =>
    t(getErrorContent("error_messages", "something_went_wrong", message));

  const RESET_TOKEN_ERRORS = new Set([
    "reset_token_expired",
    "reset_token_invalid",
    "reset_token_used",
    "reset_user_not_found",
  ]);

  const isResetTokenError = (message?: string) => message && RESET_TOKEN_ERRORS.has(message);

  useEffect(() => {
    setResetTokenExpired(false);
    setSubmitError("");
    setPasswordError("");
    setPasswordConfirmationError("");

    if (!token) return;

    const validateToken = async () => {
      try {
        await validatePasswordResetToken(token);
      } catch (error) {
        const { message } = handleHttpError(error);

        if (isResetTokenError(message)) {
          setResetTokenExpired(true);
        } else {
          setSubmitError(getTranslatedError(message));
        }
      }
    };

    validateToken();
  }, [t, token]);

  const validateEmail = (value: string): string => {
    let message = "";

    if (!hasRequiredValue(value)) {
      message = t("reset_password.validation.email_required");
    } else if (!isEmailValid(value)) {
      message = t("reset_password.validation.invalid_email");
    }

    return message;
  };

  const validatePasswords = (
    nextPassword: string,
    nextConfirmation: string
  ): { password: string; confirmation: string } => {
    const minPasswordLength = 8;
    let passwordMsg = "";
    let confirmationMsg = "";

    if (!hasRequiredValue(nextPassword)) {
      passwordMsg = t("reset_password.validation.password_required");
    } else if (nextPassword.length < minPasswordLength) {
      passwordMsg = t("reset_password.validation.password_min_length");
    }

    if (!hasRequiredValue(nextConfirmation)) {
      confirmationMsg = t("reset_password.validation.confirm_password_required");
    } else if (nextPassword !== nextConfirmation) {
      confirmationMsg = t("reset_password.validation.passwords_mismatch");
    }

    return { password: passwordMsg, confirmation: confirmationMsg };
  };

  const onRequestReset = async () => {
    setRequestSubmitError("");

    const errorMsg = validateEmail(email);
    setEmailError(errorMsg);

    if (errorMsg) return;

    try {
      await requestPasswordReset(email);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to request password reset", error);
      const { message } = handleHttpError(error);
      setRequestSubmitError(getTranslatedError(message));
    }
  };

  const onConfirmReset = async () => {
    setSubmitError("");

    const { password: pwdErr, confirmation: confErr } = validatePasswords(
      password,
      passwordConfirmation
    );

    setPasswordError(pwdErr);
    setPasswordConfirmationError(confErr);

    if (pwdErr || confErr) return;

    try {
      await confirmPasswordReset(token, {
        newPassword: password,
        confirmNewPassword: passwordConfirmation,
      });

      toast.success(t("success_messages.password_updated"), { duration: 3000 });
      logout();
      navigate("/login");
    } catch (error) {
      const { message } = handleHttpError(error);

      if (isResetTokenError(message)) {
        setResetTokenExpired(true);
      } else {
        setSubmitError(getTranslatedError(message));
      }
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError("");
    if (requestSubmitError) setRequestSubmitError("");
  };

  const renderContent = () => {
    if (token) {
      return (
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
          onSubmit={onConfirmReset}
        />
      );
    }

    if (submitted) {
      return (
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
                <Link3
                  key="contact-email"
                  href="mailto:contact@wearehorizontal.org"
                />,
              ]}
            />
          </SuccessInfo>
        </StyledForm>
      );
    }

    return (
      <ResetPasswordRequestForm
        title={t("reset_password.title")}
        description={t("reset_password.subtitle")}
        emailLabel={t("reset_password.email_placeholder")}
        buttonText={t("reset_password.send_button")}
        email={email}
        emailError={emailError}
        submitError={requestSubmitError}
        submitDisabled={!hasRequiredValue(email) || !isEmailValid(email)}
        onEmailChange={handleEmailChange}
        onSubmit={onRequestReset}
      />
    );
  };

  if (token && resetTokenExpired) {
    return (
      <InvitationExpiredLayout
        onButtonClick={() => {
          setResetTokenExpired(false);
          navigate("/reset-password");
        }}
      />
    );
  }

  return (
    <Container>
      <Navbar
        translatedTexts={{ home: "", about: "", menu: "", logIn: t("login.login_header_button"), createSpace: "" }}
        onNavigate={navigate} />
      <ContentWrapper>
        <BackgroundPattern />
        <Content>{renderContent()}</Content>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  padding: 24px;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  overflow-y: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
    align-items: flex-start;
    padding-top: 48px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 48px auto;
  width: 100%;
  height: auto;
`;

const StyledForm = styled(Form)`
  position: relative;
  z-index: 1;
  text-align: left;
  margin-bottom: 32px;
  gap: 16px;
`;

const SuccessInfo = styled(Body3)`
  margin-top: 16px;
`;

const BackgroundPattern = styled.div`
  background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;
  pointer-events: none;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;
