import { Body1, Modal, TextInput, styled } from "@shira/ui";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleHttpError } from "../../../fetch/handleError";
import { hasRequiredValue } from "../../../utils/validation";
import { getErrorContent } from "../../../utils/getErrorContent";
import toast from "react-hot-toast";
import { ACCOUNT_SETTINGS_PASSWORD_MAX_LENGTH } from "../../../utils/inputLimits";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onSave: (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void>;
}

export const ChangePasswordModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onSave,
}) => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentPasswordApiError, setCurrentPasswordApiError] = useState("");

  const currentPasswordError = currentPasswordApiError
    || (hasSubmitted && !hasRequiredValue(currentPassword)
      ? t("reset_password.validation.password_required")
      : "");
  const newPasswordError = hasRequiredValue(newPassword) && newPassword.length < 8
    ? t("reset_password.validation.password_min_length")
    : "";
  const confirmPasswordError = hasRequiredValue(confirmPassword)
    && newPassword.length > 0 && confirmPassword !== newPassword
    ? t("reset_password.validation.passwords_mismatch")
    : "";

  const checkLength = (value: string): boolean => {
    return value.length > ACCOUNT_SETTINGS_PASSWORD_MAX_LENGTH;
  };

  const submitDisabled = useMemo(() =>
    !hasRequiredValue(currentPassword) ||
    !hasRequiredValue(newPassword) ||
    !hasRequiredValue(confirmPassword) ||
    checkLength(currentPassword) ||
    checkLength(newPassword) ||
    checkLength(confirmPassword) ||
    Boolean(newPasswordError) ||
    Boolean(confirmPasswordError),
    [
      currentPassword,
      newPassword,
      confirmPassword,
      newPasswordError,
      confirmPasswordError,
    ],
  );

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setHasSubmitted(false);
      setCurrentPasswordApiError("");
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setHasSubmitted(false);
    setCurrentPasswordApiError("");
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    setHasSubmitted(true);
    setCurrentPasswordApiError("");

    if (submitDisabled) {
      return;
    }

    try {
      await onSave({
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
        confirmPassword: confirmPassword.trim(),
      });
      setIsModalOpen(false);
      toast.success(t("success_messages.password_updated"), { duration: 3000 });
    } catch (error) {
      const { message } = handleHttpError(error);

      setCurrentPasswordApiError(t(getErrorContent("error_messages", "something_went_wrong", message)));
    }
  };

  return (
    <Modal
      id="change-password-modal"
      isOpen={isModalOpen}
      title={t("modals.change_password.title")}
      primaryButtonText={t("buttons.save")}
      primaryButtonDisabled={submitDisabled}
      secondaryButtonText={t("buttons.cancel")}
      onPrimaryClick={handleSave}
      onSecondaryClick={handleClose}
      onClose={handleClose}
    >
      <ModalContent>
        <Body1>{t("modals.change_password.subtitle")}</Body1>

        <Fields>
          <FieldGroup>
            <TextInput
              id="change-password-current-input"
              type="password"
              label={t("modals.change_password.current_password_placeholder")}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (currentPasswordApiError) {
                  setCurrentPasswordApiError("");
                }
              }}
              showCharacterCount={true}
              maxLength={ACCOUNT_SETTINGS_PASSWORD_MAX_LENGTH}
              characterLimitErrorText={t('error_messages.character_limit_error')}
            />
            <FieldError $visible={Boolean(currentPasswordError)}>
              {currentPasswordError}
            </FieldError>
          </FieldGroup>

          <FieldGroup>
            <TextInput
              id="change-password-new-input"
              type="password"
              label={t("modals.change_password.new_password_placeholder")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showCharacterCount={true}
              maxLength={ACCOUNT_SETTINGS_PASSWORD_MAX_LENGTH}
              characterLimitErrorText={t('error_messages.character_limit_error')}
            />
            <FieldError $visible={Boolean(newPasswordError)}>
              {newPasswordError}
            </FieldError>
          </FieldGroup>

          <FieldGroup>
            <TextInput
              id="change-password-confirm-input"
              type="password"
              label={t("modals.change_password.confirm_password_placeholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showCharacterCount={true}
              maxLength={ACCOUNT_SETTINGS_PASSWORD_MAX_LENGTH}
              characterLimitErrorText={t('error_messages.character_limit_error')}
            />
            <FieldError $visible={Boolean(confirmPasswordError)}>
              {confirmPasswordError}
            </FieldError>
          </FieldGroup>
        </Fields>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldError = styled.div<{ $visible?: boolean }>`
  min-height: 18px;
  color: ${props => props.theme.colors.error7};
  font-size: 14px;
  line-height: 18px;
  padding-left: 4px;
  margin-top: 8px;
  visibility: ${props => (props.$visible ? "visible" : "hidden")};
`;
