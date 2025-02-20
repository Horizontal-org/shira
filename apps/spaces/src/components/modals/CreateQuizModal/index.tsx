import { FunctionComponent, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";

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

  const [title, handleTitle] = useState('')

  return (
    <Modal
      isOpen={isModalOpen}
      title={`Give a name to your new quiz`}
      primaryButtonText="Create new quiz"
      primaryButtonDisabled={title.length === 0}
      secondaryButtonText="Cancel"
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