import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, TextInput, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { LibraryQuizDto } from "../../../fetch/quiz_library";
import { useTitleUpdate } from "../../../hooks/useTitleUpdate";
import { QUIZ_NAME_MAX_LENGTH } from "../../../utils/inputLimits";
import { hasRequiredValue } from "../../../utils/validation";

interface Props {
  quiz: LibraryQuizDto | null;
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
  validateQuizName: (name: string) => Promise<void>;
  isSubmitting?: boolean;
}

export const AddQuizFromTemplateModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  onClose,
  onConfirm,
  validateQuizName,
  isSubmitting = false,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const {
    isValidatingTitle,
    titleError,
    clearTitleValidation,
    handleTitleChange,
    handleTitleSubmit,
  } = useTitleUpdate({
    setTitle,
    validateQuizName,
    onValidTitle: onConfirm,
  });
  const trimmedTitle = title.trim();
  const hasError = Boolean(titleError);

  const cannotSubmit = !hasRequiredValue(trimmedTitle)
    || isSubmitting
    || isValidatingTitle
    || hasError
    || title.length > QUIZ_NAME_MAX_LENGTH;

  useEffect(() => {
    if (quiz && isModalOpen) {
      setTitle(quiz.title);
      clearTitleValidation();
      return;
    }

    if (!isModalOpen) {
      setTitle("");
      clearTitleValidation();
    }
  }, [quiz, isModalOpen]);

  if (!quiz) {
    return null;
  }

  return (
    <Modal
      id="add-quiz-from-template-modal"
      isOpen={isModalOpen}
      title={t("modals.add_quiz_from_template.title")}
      primaryButtonText={t("buttons.next")}
      primaryButtonDisabled={cannotSubmit}
      secondaryButtonText={t("buttons.cancel")}
      onPrimaryClick={() => {
        if (cannotSubmit) {
          return;
        }

        handleTitleSubmit(title);
      }}
      onSecondaryClick={() => {
        clearTitleValidation();
        setTitle("");
        onClose();
      }}
      onClose={onClose}
    >
      <Description>{t("modals.add_quiz_from_template.subtitle")}</Description>

      <FormContent>
        <TextInput
          id="add-quiz-from-template-title-input"
          label={t("modals.add_quiz_from_template.input_label")}
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          isLoading={isSubmitting || isValidatingTitle}
          showCharacterCount={true}
          maxLength={QUIZ_NAME_MAX_LENGTH}
          characterLimitErrorText={t("error_messages.character_limit_error")}
        />

        <ErrorContainer role="alert" aria-live="polite">
          {hasError && <ErrorText>{t(titleError)}</ErrorText>}
        </ErrorContainer>
      </FormContent>
    </Modal>
  );
};

const Description = styled(Body1)`
  padding-bottom: 16px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ErrorContainer = styled.div`
  min-height: 32px;
  padding: 0 10px;
`;

const ErrorText = styled.p`
  color: ${defaultTheme.colors.error7};
  margin: 0;
  padding: 4px 10px;
  font-size: 14px;
`;
