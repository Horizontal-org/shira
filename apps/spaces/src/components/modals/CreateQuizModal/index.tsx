import { FunctionComponent, useState } from "react";
import { Modal, styled, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onCreate: (title: string) => void;
  onCancel?: () => void;
  keepOpenOnPrimary?: boolean;
}

export const CreateQuizModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onCreate,
  onCancel,
  keepOpenOnPrimary = false,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
    setTitle("");
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      setTitle("");
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      id="create-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.create_quiz.title')}
      primaryButtonText={t('buttons.next')}
      primaryButtonDisabled={!title || title.trim() === ""}
      onPrimaryClick={() => {
        onCreate(title.trim());
        if (keepOpenOnPrimary) {
          setTitle("");
        } else {
          handleClose();
        }
      }}
      secondaryButtonText={t("buttons.cancel")}
      onSecondaryClick={handleCancel}
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