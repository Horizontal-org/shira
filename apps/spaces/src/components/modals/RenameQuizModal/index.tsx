import { FunctionComponent, useEffect, useState } from "react";
import { Modal, TextInput } from "@horizontal-org/shira-ui";
import styled from "styled-components";
import { Quiz } from "../../../store/slices/quiz";
import { useTranslation } from "react-i18next";
import { hasRequiredValue } from "../../../utils/validation";
import { useTitleUpdate } from "../../../hooks/useTitleUpdate";
import { QUIZ_NAME_MAX_LENGTH } from "../../../utils/inputLimits";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  validateQuizName: (name: string) => Promise<void>;
  onRename: (title: string) => void;
  onCancel: () => void;
}

export const RenameQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen,
  validateQuizName,
  onRename,
  onCancel,
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
      setIsModalOpen(false);
      onRename(newTitle);
    },
    shouldValidateTitle: (trimmedTitle) => trimmedTitle !== quiz.title.trim(),
  });
  const trimmedTitle = title.trim();
  const hasError = Boolean(titleError);

  const cannotSubmit = !hasRequiredValue(trimmedTitle)
    || isValidatingTitle
    || hasError
    || title.length > QUIZ_NAME_MAX_LENGTH;

  useEffect(() => {
    if (quiz && isModalOpen) {
      setTitle(quiz.title);
      clearTitleValidation();
    }
  }, [quiz, isModalOpen]);

  return quiz && (
    <Modal
      id="rename-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.rename_quiz.title')}
      primaryButtonText={t('buttons.save')}
      secondaryButtonText={t('buttons.cancel')}
      primaryButtonDisabled={cannotSubmit}
      onPrimaryClick={() => {
        if (cannotSubmit) { return; }
        handleTitleSubmit(title);
      }}
      onSecondaryClick={() => {
        clearTitleValidation();
        setTitle("");
        onCancel();
      }}
    >
      <FormContent>
        <TextInput
          id="rename-quiz-input"
          label={t('modals.rename_quiz.input_placeholder')}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          isLoading={isValidatingTitle}
          showCharacterCount={true}
          maxLength={QUIZ_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
          errorText={hasError ? t(titleError) : ""}
        />
      </FormContent>
    </Modal>
  )
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;
