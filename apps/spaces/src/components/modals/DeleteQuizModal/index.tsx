import { FunctionComponent, useState } from "react";
import { Body1, Modal, TextInput } from "@shira/ui";
import styled from "styled-components";

import { Quiz } from "../../../store/slices/quiz";

interface Props {
  quiz: Quiz
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
}

export const DeleteQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen
}) => {


  return quiz && (
      <Modal
        isOpen={isModalOpen}
        title={`Are you sure you want to delete "${quiz.title}"?`}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryClick={() => {
        // Handle quiz creation here
          setIsModalOpen(false);
        }}
        onSecondaryClick={() => setIsModalOpen(false)}
    >
        <FormContent>
        {/* <TextInput
            label="Quiz name"
            value={newQuizName}
            onChange={(e) => setNewQuizName(e.target.value)}
        /> */}
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