import { FunctionComponent } from "react";
import { Modal, styled, TextInput } from "@shira/ui";
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
}

export const CreateQuizModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  title,
  setTitle,
  onCreate,
  onCancel,
  keepModalOpen = false,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="create-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.create_quiz.title')}
      primaryButtonText={t('buttons.next')}
      primaryButtonDisabled={!hasRequiredValue(title)}
      onPrimaryClick={() => {
        if (!hasRequiredValue(title)) {
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
      </FormContent>
    </Modal>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;