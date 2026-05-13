import { FunctionComponent, useEffect, useState } from "react";
import { Modal, TextInput, defaultTheme } from "@shira/ui";
import styled from "styled-components";

import { Quiz } from "../../../store/slices/quiz";
import { useTranslation } from "react-i18next";
import { hasRequiredValue } from "../../../utils/validation";
import { useTitleUpdate } from "../../../hooks/useTitleUpdate";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  validateQuizName: (name: string) => Promise<void>;
  onRename: (title: string) => void;
  onCancel: () => void;
}

const QUIZ_NAME_MAX_LENGTH = 150;

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
      primaryButtonDisabled={!hasRequiredValue(trimmedTitle) || isValidatingTitle || hasError}
      onPrimaryClick={() => {
        if (!hasRequiredValue(trimmedTitle) || isValidatingTitle || hasError) { return; }
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
        />
        <ErrorContainer role="alert" aria-live="polite">
          {hasError && <ErrorText>{t(titleError)}</ErrorText>}
        </ErrorContainer>
      </FormContent>
    </Modal>
  )
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
