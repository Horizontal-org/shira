import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";

import { Quiz } from "../../../store/slices/quiz";

interface Props {
  quiz: Quiz
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onRename: (title: string) => void
  onCancel: () => void
}

export const RenameQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen,
  onRename,
  onCancel
}) => {

  const [title, handleTitle] = useState('')

  useEffect(() => {
    if (quiz) {
      handleTitle(quiz.title)
    }
  }, [quiz])

  return quiz && (
    <Modal
      isOpen={isModalOpen}
      title={`Rename quiz`}
      primaryButtonText="OK"
      primaryButtonDisabled={!title || title.trim() === ""}
      secondaryButtonText="Cancel"
      onPrimaryClick={() => {
        setIsModalOpen(false);
        onRename(title)
        handleTitle('')
      }}
      onSecondaryClick={() => {
        handleTitle('')
        onCancel()
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