import { Body1, Modal } from "@shira/ui";
import { FunctionComponent } from "react";
import { LibraryQuizDto } from "../../../fetch/quiz_library";

interface Props {
  quiz: LibraryQuizDto | null;
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export const AddLibraryQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
}) => {
  if (!quiz) {
    return null;
  }

  return (
    <Modal
      id="add-library-quiz-modal"
      isOpen={isModalOpen}
      title={"Add Library Quiz"}
      primaryButtonText={"Add"}
      secondaryButtonText={"Cancel"}
      primaryButtonDisabled={isSubmitting}
      onPrimaryClick={() => {
        if (isSubmitting) {
          return;
        }

        onConfirm();
      }}
      onSecondaryClick={onClose}
      onClose={onClose}
    >
      <Body1>{`Are you sure you want to add the quiz "${quiz.title}" to your library?`}</Body1>
    </Modal>
  );
};
