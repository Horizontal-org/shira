import { FunctionComponent, useEffect } from "react";
import { Modal, TextInput, defaultTheme } from "@shira/ui";
import styled from "styled-components";

import { Quiz } from "../../../store/slices/quiz";
import { useTranslation } from "react-i18next";
import { hasRequiredValue } from "../../../utils/validation";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  onRename: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export const RenameQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen,
  title,
  setTitle,
  onRename,
  onCancel,
  isLoading = false,
  errorMessage = null,
}) => {
  const { t } = useTranslation();
  const trimmedTitle = title.trim();
  const hasError = Boolean(errorMessage);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
    }
  }, [quiz, setTitle]);

  return quiz && (
    <Modal
      id="rename-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.rename_quiz.title')}
      primaryButtonText={t('buttons.save')}
      secondaryButtonText={t('buttons.cancel')}
      primaryButtonDisabled={!hasRequiredValue(trimmedTitle) || isLoading || hasError}
      onPrimaryClick={() => {
        if (!hasRequiredValue(trimmedTitle) || isLoading || hasError) { return; }
        setIsModalOpen(false);
        onRename(trimmedTitle);
        setTitle("");
      }}
      onSecondaryClick={() => {
        setTitle("");
        onCancel();
      }}
    >
      <FormContent>
        <TextInput
          id="rename-quiz-input"
          label={t('modals.rename_quiz.input_placeholder')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isLoading={isLoading}
        />
        <ErrorContainer role="alert" aria-live="polite">
          {hasError && <ErrorText>{t(errorMessage)}</ErrorText>}
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
