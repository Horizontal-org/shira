import { FunctionComponent, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Body3, Form, Link3, styled } from "@shira/ui";
import { hasRequiredValue, isEmailValid } from "../../../utils/validation";
import { requestPasswordReset } from "../../../fetch/password_reset";
import { handleHttpError } from "../../../fetch/handleError";
import { getErrorContent } from "../../../utils/getErrorContent";
import { ResetPasswordRequestForm } from "./ResetPasswordRequestForm";
import { ResetPasswordLayout } from "..";

export const ResetPasswordRequestLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [requestSubmitError, setRequestSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");
    if (token) {
      navigate(`/reset-password/${token}`, { replace: true });
    }
  }, [navigate, search]);

  const validateEmail = (value: string): string => {
    let message = "";

    if (!hasRequiredValue(value)) {
      message = t("reset_password.validation.email_required");
    } else if (!isEmailValid(value)) {
      message = t("reset_password.validation.invalid_email");
    }

    return message;
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
      const { message } = handleHttpError(error);
      setRequestSubmitError(t(getErrorContent("error_messages", "something_went_wrong", message)));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError("");
    if (requestSubmitError) setRequestSubmitError("");
  };

  return (
    <ResetPasswordLayout>
      {submitted ? (
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
    </ResetPasswordLayout>
  );
};

export { SetNewPasswordLayout } from "../SetNewPasswordLayout";
export { ResetPasswordRequestLayout as ResetPasswordLayout };

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
