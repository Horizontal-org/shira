import { FunctionComponent, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";


interface Props {
  // quiz: Quiz
  title: string;
  content: string | React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onDelete: () => void
  onCancel: () => void
}

export const DeleteModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onDelete,
  onCancel,
  title = '',
  content = ''
}) => {

  return (
      <Modal
        isOpen={isModalOpen}
        title={title}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        type={ModalType.Danger}
        onPrimaryClick={() => {
          setIsModalOpen(false);
          onDelete()
        }}
        onSecondaryClick={onCancel}
    >
        <FormContent>
          <Body1>
            { content }
          </Body1>
        </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;