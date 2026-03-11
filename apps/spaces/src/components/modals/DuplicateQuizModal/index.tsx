import { FunctionComponent, useEffect } from "react";
import { Body1, Modal, defaultTheme, styled, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { Quiz } from "../../../store/slices/quiz";
import { hasRequiredValue } from "../../../utils/validation";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  title: string;
  setTitle: (title: string) => void;
  onDuplicate: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export const DuplicateQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  title,
  setTitle,
  onDuplicate,
  onCancel,
  isLoading = false,
  errorMessage = null,
}) => {
  const { t } = useTranslation();
  const hasError = Boolean(errorMessage);

  useEffect(() => {
    if (quiz) {
      setTitle(`Copy of ${quiz.title}`);
    }
  }, [quiz]);

  if (!quiz) {
    return null;
  }

  return (
    <Modal
      id="duplicate-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.duplicate_quiz.title')}
      primaryButtonText={t('buttons.next')}
      primaryButtonDisabled={!hasRequiredValue(title) || hasError}
      secondaryButtonText={t('buttons.back')}
      onPrimaryClick={() => {
        if (!hasRequiredValue(title) || hasError) { return; }
        onDuplicate(title);
      }}
      onSecondaryClick={() => {
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
          onChange={(e) => setTitle(e.target.value)}
          isLoading={isLoading}
        />
        <ErrorContainer role="alert" aria-live="polite">
          {hasError && <ErrorText>{t(errorMessage)}</ErrorText>}
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
