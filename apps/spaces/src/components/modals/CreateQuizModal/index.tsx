import { FunctionComponent } from "react";
import { Modal, defaultTheme, styled, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { hasRequiredValue } from "../../../utils/validation";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;

  title: string;
  setTitle: (title: string) => void;

  onCreate: (title: string) => void;
  onCancel?: () => void;
  keepModalOpen?: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export const CreateQuizModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  title,
  setTitle,
  onCreate,
  onCancel,
  keepModalOpen = false,
  isLoading = false,
  errorMessage = null,
}) => {
  const { t } = useTranslation();
  const hasError = Boolean(errorMessage);

  return (
    <Modal
      id="create-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.create_quiz.title')}
      primaryButtonText={isLoading ? t('loading_messages.loading') : t('buttons.next')}
      primaryButtonDisabled={!hasRequiredValue(title) || isLoading || hasError}
      onPrimaryClick={() => {
        if (!hasRequiredValue(title) || isLoading || hasError) {
          return;
        }
        onCreate(title.trim());
        if (!keepModalOpen) {
          setIsModalOpen(false);
        }
      }}
      secondaryButtonText={t("buttons.cancel")}
      onSecondaryClick={() => {
        onCancel?.();
        setIsModalOpen(false);
      }}
    >
      <FormContent>
        <TextInput
          id="create-quiz-title-input"
          label="Quiz name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
