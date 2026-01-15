import { FunctionComponent } from "react";
import { Modal, styled, TextInput, defaultTheme } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;

  title: string;
  setTitle: (title: string) => void;

  onCreate: (title: string) => void;
  onCancel?: () => void;
  keepModalOpen?: boolean;
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
  errorMessage = null,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="create-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.create_quiz.title')}
      primaryButtonText={t('buttons.next')}
      primaryButtonDisabled={!title || title.trim() === ""}
      onPrimaryClick={() => {
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
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </ErrorContainer>
      </FormContent>
    </Modal>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorContainer = styled.div`
  min-height: 24px;
  padding: 0 10px;
`;

const ErrorText = styled.p`
  color: ${defaultTheme.colors.error7};
  padding: 4px 10px;
  margin-top: 4px;
  font-size: 11px;
`;
