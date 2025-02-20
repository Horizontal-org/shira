import { FunctionComponent, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";

import { Quiz } from "../../../store/slices/quiz";

interface Props {
  quiz: Quiz
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onDelete: (id: number) => void
  onCancel: () => void
}

export const DeleteQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen,
  onDelete,
  onCancel
}) => {
  console.log("🚀 ~ isModalOpen:", isModalOpen)
  console.log("🚀 ~ quiz:", quiz)


  return quiz && (
      <Modal
        isOpen={isModalOpen}
        title={`Are you sure you want to delete "${quiz.title}"?`}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        type={ModalType.Danger}
        onPrimaryClick={() => {
          setIsModalOpen(false);
          onDelete(quiz.id)
        }}
        onSecondaryClick={onCancel}
    >
        <FormContent>
          <Body1>
            Deleting this quiz is permanent and cannot be undone.
          </Body1>
        </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;