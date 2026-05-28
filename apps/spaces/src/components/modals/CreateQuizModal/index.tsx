import { FunctionComponent, useEffect, useState } from "react";
import { Modal, styled, TextInput } from "@horizontal-org/shira-ui";
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
  const trimmedTitle = title.trim();
  const hasError = Boolean(titleError);

  const cannotSubmit = !hasRequiredValue(trimmedTitle)
    || isValidatingTitle
    || hasError
    || title.length > QUIZ_NAME_MAX_LENGTH;

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
      primaryButtonDisabled={cannotSubmit}
      onPrimaryClick={() => {
        if (cannotSubmit) {
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
          label={t('modals.create_quiz.input_placeholder')}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          isLoading={isValidatingTitle}
          showCharacterCount={true}
          maxLength={QUIZ_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          supportingText={hasError && t(titleError)}
          supportingTextIsError={hasError}
        />
      </FormContent>
    </Modal>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;
