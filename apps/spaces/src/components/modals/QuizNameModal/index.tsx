import { FunctionComponent, useEffect, useState } from "react";
import { Modal, styled, TextInput } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { hasRequiredValue } from "../../../utils/validation";
import { useTitleUpdate } from "../../../hooks/useTitleUpdate";
import { QUIZ_NAME_MAX_LENGTH } from "../../../utils/inputLimits";

interface Props {
  isModalOpen: boolean;
  title: string;
  subtitle?: string;
  inputLabel: string;
  placeholder?: string;
  initialValue?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  isSubmitting?: boolean;
  validateQuizName: (name: string) => Promise<void>;
  onSubmit: (title: string) => void;
  onCancel: () => void;
}

export const QuizNameModal: FunctionComponent<Props> = ({
  isModalOpen,
  title,
  subtitle,
  inputLabel,
  placeholder,
  initialValue = "",
  submitButtonText,
  cancelButtonText,
  isSubmitting = false,
  validateQuizName,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [titleValue, setTitleValue] = useState(initialValue);
  const {
    isValidatingTitle,
    titleError,
    clearTitleValidation,
    handleTitleChange,
    handleTitleSubmit,
  } = useTitleUpdate({
    setTitle: setTitleValue,
    validateQuizName,
    onValidTitle: onSubmit,
  });
  const trimmedTitle = titleValue.trim();
  const hasError = Boolean(titleError);

  const cannotSubmit = !hasRequiredValue(trimmedTitle)
    || isSubmitting
    || isValidatingTitle
    || hasError
    || titleValue.length > QUIZ_NAME_MAX_LENGTH;

  useEffect(() => {
    if (isModalOpen) {
      setTitleValue(initialValue);
      clearTitleValidation();
    }
  }, [isModalOpen, initialValue]);

  return (
    <Modal
      id="quiz-name-modal"
      isOpen={isModalOpen}
      title={title}
      subtitle={subtitle}
      primaryButtonText={submitButtonText ?? t('buttons.next')}
      primaryButtonDisabled={cannotSubmit}
      secondaryButtonText={cancelButtonText ?? t('buttons.cancel')}
      onPrimaryClick={() => {
        if (cannotSubmit) { return; }
        handleTitleSubmit(titleValue);
      }}
      onSecondaryClick={() => {
        clearTitleValidation();
        onCancel();
      }}
    >
      <FormContent>
        <TextInput
          id="quiz-name-input"
          label={inputLabel}
          placeholder={placeholder}
          value={titleValue}
          onChange={(e) => handleTitleChange(e.target.value)}
          isLoading={isSubmitting || isValidatingTitle}
          showCharacterCount={true}
          maxLength={QUIZ_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          errorText={hasError ? t(titleError) : undefined}
        />
      </FormContent>
    </Modal>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;
