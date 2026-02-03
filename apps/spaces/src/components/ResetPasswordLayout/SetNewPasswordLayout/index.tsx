import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { hasRequiredValue } from "../../../utils/validation";
import { confirmPasswordReset, validatePasswordResetToken } from "../../../fetch/password_reset";
import { handleHttpError } from "../../../fetch/handleError";
import { getErrorContent } from "../../../utils/getErrorContent";
import { useStore } from "../../../store";
import { InvalidInvitationLayout } from "../InvalidInvitationLayout";
import { SetNewPasswordForm } from "./SetNewPasswordForm";
import { ResetPasswordLayout } from "..";

export const SetNewPasswordLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const { token = "" } = useParams();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [tokenValidationStatus, setTokenValidationStatus] = useState<"checking" | "valid" | "invalid">("checking");

  useEffect(() => {
    if (!token) {
      navigate("/reset-password", { replace: true });
      return;
    }

    setTokenValidationStatus("checking");
    setSubmitError("");
    setPasswordError("");
    setPasswordConfirmationError("");

    const validateToken = async () => {
      try {
        await validatePasswordResetToken(token);
        setTokenValidationStatus("valid");
      } catch (error) {
        const { message } = handleHttpError(error);

        if (message === "reset_token_invalid") {
          setTokenValidationStatus("invalid");
        } else {
          setTokenValidationStatus("valid");
          setSubmitError(t(getErrorContent("error_messages", "something_went_wrong", message)));
        }
      }
    };

    validateToken();
  }, [navigate, t, token]);

  const validatePasswords = (newPassword: string, confirmation: string) => {
    const minPasswordLength = 8;
    let passwordError = "";
    let confirmationError = "";

    if (!hasRequiredValue(newPassword)) {
      passwordError = t("reset_password.validation.password_required");
    } else if (newPassword.length < minPasswordLength) {
      passwordError = t("reset_password.validation.password_min_length");
    }

    if (!hasRequiredValue(confirmation)) {
      confirmationError = t("reset_password.validation.confirm_password_required");
    } else if (newPassword !== confirmation) {
      confirmationError = t("reset_password.validation.passwords_mismatch");
    }

    return { passwordError, confirmationError };
  };

  const onConfirmReset = async () => {
    setSubmitError("");

    const { passwordError, confirmationError } =
      validatePasswords(password, passwordConfirmation);

    setPasswordError(passwordError);
    setPasswordConfirmationError(confirmationError);
    if (passwordError || confirmationError) return;

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

  if (tokenValidationStatus === "checking") {
    return null;
  }

  if (tokenValidationStatus === "invalid") {
    return (
      <InvalidInvitationLayout
        onClick={() => {
          setTokenValidationStatus("checking");
          navigate("/reset-password", { replace: true });
        }}
      />
    );
  }

  return (
    <ResetPasswordLayout>
      <SetNewPasswordForm
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
    </ResetPasswordLayout>
  );
};
