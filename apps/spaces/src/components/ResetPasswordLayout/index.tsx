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
import { SetNewPasswordForm } from "./SetNewPasswordForm";
import { ResetPasswordRequestForm } from "./ResetPasswordRequestForm";
import backgroundSvg from "../../assets/Background.svg";
import { InvalidInvitationLayout } from "../InvalidInvitationLayout";

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
  const [resetTokenInvalid, setResetTokenInvalid] = useState(false);

  useEffect(() => {
    setResetTokenInvalid(false);
    setSubmitError("");
    setPasswordError("");
    setPasswordConfirmationError("");

    if (!token) return;

    const validateToken = async () => {
      try {
        await validatePasswordResetToken(token);
      } catch (error) {
        const { message } = handleHttpError(error);

        if (message && message === "reset_token_invalid") {
          setResetTokenInvalid(true);
        } else {
          setSubmitError(t(getErrorContent("error_messages", "something_went_wrong", message)));
        }
      }
    };

    validateToken();
  }, [navigate, t, token]);

  const validateEmail = (value: string): string => {
    let message = "";

    if (!hasRequiredValue(value)) {
      message = t("reset_password.validation.email_required");
    } else if (!isEmailValid(value)) {
      message = t("reset_password.validation.invalid_email");
    }

    return message;
  };

  const validatePasswords = (newPassword: string, passwordConfirmation: string) => {
    const minPasswordLength = 8;
    let passwordMsg = "";
    let confirmationMsg = "";

    if (!hasRequiredValue(newPassword)) {
      passwordMsg = t("reset_password.validation.password_required");
    } else if (newPassword.length < minPasswordLength) {
      passwordMsg = t("reset_password.validation.password_min_length");
    }

    if (!hasRequiredValue(passwordConfirmation)) {
      confirmationMsg = t("reset_password.validation.confirm_password_required");
    } else if (newPassword !== passwordConfirmation) {
      confirmationMsg = t("reset_password.validation.passwords_mismatch");
    }

    return { passwordMsg, confirmationMsg };
  };

  const onRequestReset = async () => {
    setRequestSubmitError("");

    const errorMsg = validateEmail(email);
    setEmailError(errorMsg ?? "");

    if (errorMsg) return;

    try {
      await requestPasswordReset(email);
      setSubmitted(true);
    } catch (error) {
      const { message } = handleHttpError(error);
      setRequestSubmitError(t(getErrorContent("error_messages", "something_went_wrong", message)));
    }
  };

  const onConfirmReset = async () => {
    setSubmitError("");

    const { passwordMsg, confirmationMsg } = validatePasswords(
      password,
      passwordConfirmation
    );

    setPasswordError(passwordMsg);
    setPasswordConfirmationError(confirmationMsg);

    if (passwordMsg || confirmationMsg) return;

    try {
      await confirmPasswordReset(token, {
        newPassword: password,
        confirmNewPassword: passwordConfirmation,
      });

      toast.success(t("success_messages.password_updated"), { duration: 3000 });

      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      const { message } = handleHttpError(error);
      setSubmitError(t(getErrorContent("error_messages", "something_went_wrong", message)));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError("");
    if (requestSubmitError) setRequestSubmitError("");
  };

  return (
    <>
      {hasRequiredValue(token) && resetTokenInvalid ? (
        <InvalidInvitationLayout
          onClick={() => {
            setResetTokenInvalid(false);
            navigate("/reset-password", {
              replace: true
            });
          }}
        />
      ) : (
        <Container>
          <Navbar
            translatedTexts={{
              home: "",
              about: "",
              menu: "",
              logIn: t("login.login_header_button"),
              createSpace: "",
            }}
            onNavigate={navigate}
          />

          <ContentWrapper>
            <BackgroundPattern />

            <Content>
              {token ? (
                <SetNewPasswordForm
                  password={password}
                  passwordConfirmation={passwordConfirmation}
                  passwordError={passwordError}
                  passwordConfirmationError={passwordConfirmationError}
                  submitError={submitError}
                  submitDisabled={
                    !hasRequiredValue(password) ||
                    !hasRequiredValue(passwordConfirmation)
                  }
                  onPasswordChange={setPassword}
                  onPasswordConfirmationChange={setPasswordConfirmation}
                  onSubmit={onConfirmReset}
                />
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
                        <Link3
                          key="contact-email"
                          href="mailto:contact@wearehorizontal.org"
                        />,
                      ]}
                    />
                  </SuccessInfo>
                </StyledForm>
              ) : (
                <ResetPasswordRequestForm
                  email={email}
                  emailError={emailError}
                  submitError={requestSubmitError}
                  submitDisabled={!hasRequiredValue(email) || !isEmailValid(email)}
                  onEmailChange={handleEmailChange}
                  onSubmit={onRequestReset}
                />
              )}
            </Content>
          </ContentWrapper>
        </Container>
      )}
    </>
  )
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

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 32px;
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
