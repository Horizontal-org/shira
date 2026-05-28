import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, styled, TextInput } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { Quiz } from "../../../store/slices/quiz";
import { hasRequiredValue } from "../../../utils/validation";
import { useTitleUpdate } from "../../../hooks/useTitleUpdate";
import { QUIZ_NAME_MAX_LENGTH } from "../../../utils/inputLimits";

interface Props {
  quiz: Quiz | null;
  isModalOpen: boolean;
  validateQuizName: (name: string) => Promise<void>;
  onDuplicate: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

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
  const trimmedTitle = title.trim();
  const hasError = Boolean(titleError);

  const cannotSubmit = !hasRequiredValue(trimmedTitle)
    || isLoading
    || isValidatingTitle
    || hasError
    || title.length > QUIZ_NAME_MAX_LENGTH;

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
      primaryButtonDisabled={cannotSubmit}
      secondaryButtonText={t('buttons.back')}
      onPrimaryClick={() => {
        if (cannotSubmit) { return; }
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
  gap: 16px;
`;

const Description = styled(Body1)`
  padding-bottom: 16px;
`;
