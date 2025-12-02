import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, ModalType, TextInput, styled } from "@shira/ui";

import { Quiz } from "../../../store/slices/quiz";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onDuplicate: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DuplicateQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen,
  onDuplicate,
  onCancel,
  isLoading = false
}) => {

  const [title, handleTitle] = useState('');

  useEffect(() => {
    if (quiz) {
      handleTitle(`Copy of ${quiz.title}`);
    }
  }, [quiz]);

  return quiz && (
    <Modal
      id="duplicate-quiz-modal"
      isOpen={isModalOpen}
      title="Duplicate quiz"
      primaryButtonText={isLoading ? "Creating..." : "Save"}
      primaryButtonDisabled={(!title || title.trim() === "") || isLoading}
      secondaryButtonText="Back"
      onPrimaryClick={() => {
        onDuplicate(title);
        handleTitle('');
      }}
      onSecondaryClick={() => {
        handleTitle('');
        onCancel();
      }}
    >
      <FormContent>
        <Description>Set the name for the new quiz</Description>
        <TextInput
          label="Quiz name"
          placeholder={`Copy of ${quiz.title}`}
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
  gap: 16px;
`;

const Description = styled(Body1)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;