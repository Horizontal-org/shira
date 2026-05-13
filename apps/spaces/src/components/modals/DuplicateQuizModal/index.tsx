import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, defaultTheme, styled, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { Quiz } from "../../../store/slices/quiz";
import { hasRequiredValue } from "../../../utils/validation";
import { useTitleUpdate } from "../../../hooks/useTitleUpdate";

interface Props {
  quiz: Quiz | null;
  isModalOpen: boolean;
  validateQuizName: (name: string) => Promise<void>;
  onDuplicate: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const QUIZ_NAME_MAX_LENGTH = 150;

export const DuplicateQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  validateQuizName,
  onDuplicate,
  onCancel,
  isLoading = false,
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
    onValidTitle: onDuplicate,
  });
  const hasError = Boolean(titleError);

  useEffect(() => {
    if (quiz && isModalOpen) {
      setTitle(`Copy of ${quiz.title}`);
      clearTitleValidation();
    }
  }, [quiz, isModalOpen]);

  if (!quiz) {
    return null;
  }

  return (
    <Modal
      id="duplicate-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.duplicate_quiz.title')}
      primaryButtonText={t('buttons.next')}
      primaryButtonDisabled={!hasRequiredValue(title) || isLoading || isValidatingTitle || hasError}
      secondaryButtonText={t('buttons.back')}
      onPrimaryClick={() => {
        if (!hasRequiredValue(title) || isLoading || isValidatingTitle || hasError) { return; }
        handleTitleSubmit(title);
      }}
      onSecondaryClick={() => {
        clearTitleValidation();
        onCancel();
      }}
    >
      <Body1>
        <Description>
          {t('modals.duplicate_quiz.subtitle')}
        </Description>
      </Body1>
      <FormContent>
        <TextInput
          label="Quiz name"
          placeholder={t('modals.duplicate_quiz.quiz_name_placeholder', { quiz_name: quiz.title })}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          isLoading={isLoading || isValidatingTitle}
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
  gap: 16px;
`;

const Description = styled(Body1)`
  padding-bottom: 16px;
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
