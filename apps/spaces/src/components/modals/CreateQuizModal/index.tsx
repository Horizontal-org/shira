import { FunctionComponent, useState } from "react";
import { Modal, TextInput } from "@shira/ui";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onCreate: (title: string) => void
}

export const CreateQuizModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onCreate
}) => {
  const { t } = useTranslation();

  const [title, handleTitle] = useState('')

  return (
    <Modal
      id="create-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.create_quiz.title')}
      primaryButtonText={t('modals.create_quiz.button')}
      primaryButtonDisabled={!title || title.trim() === ""}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        onCreate(title)
        setIsModalOpen(false);
        handleTitle('')
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false)
        handleTitle('')
      }}
    >
      <FormContent>
        <TextInput
          label="Quiz name"
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
        />
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;