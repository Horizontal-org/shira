import { Body1, Modal } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  if (!quiz) {
    return null;
  }

  return (
    <Modal
      id="add-library-quiz-modal"
      isOpen={isModalOpen}
      title={t("modals.add_library_quiz.title")}
      primaryButtonText={t("buttons.add")}
      secondaryButtonText={t("buttons.cancel")}
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
      <Body1>{t("modals.add_library_quiz.message", { quiz_name: quiz.title })}</Body1>
    </Modal>
  );
};
