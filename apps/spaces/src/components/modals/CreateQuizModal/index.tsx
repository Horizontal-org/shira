import { FunctionComponent, useEffect, useState } from "react";
import { Modal, defaultTheme, styled, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { hasRequiredValue } from "../../../utils/validation";
import { useTitleUpdate } from "../../../hooks/useTitleUpdate";
import { QUIZ_NAME_MAX_LENGTH } from "../../../utils/inputLimits";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  validateQuizName: (name: string) => Promise<void>;
  onCreate: (title: string) => void;
  onCancel?: () => void;
  keepModalOpen?: boolean;
}

export const CreateQuizModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  validateQuizName,
  onCreate,
  onCancel,
  keepModalOpen = false,
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
    onValidTitle: (newTitle) => {
      onCreate(newTitle);

      if (!keepModalOpen) {
        setIsModalOpen(false);
      }
    },
  });
  const hasError = Boolean(titleError);

  useEffect(() => {
    if (!isModalOpen) {
      setTitle("");
      clearTitleValidation();
    }
  }, [isModalOpen]);

  return (
    <Modal
      id="create-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.create_quiz.title')}
      primaryButtonText={t('buttons.next')}
      primaryButtonDisabled={!hasRequiredValue(title) || isValidatingTitle || hasError}
      onPrimaryClick={() => {
        if (!hasRequiredValue(title) || isValidatingTitle || hasError) {
          return;
        }
        handleTitleSubmit(title);
      }}
      secondaryButtonText={t("buttons.cancel")}
      onSecondaryClick={() => {
        clearTitleValidation();
        setTitle("");
        onCancel?.();
        setIsModalOpen(false);
      }}
    >
      <FormContent>
        <TextInput
          id="create-quiz-title-input"
          label="Quiz name"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          isLoading={isValidatingTitle}
          showCharacterCount={true}
          maxLength={QUIZ_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
        />
        <ErrorContainer role="alert" aria-live="polite">
          {hasError && <ErrorText>{t(titleError)}</ErrorText>}
        </ErrorContainer>
      </FormContent>
    </Modal>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
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
