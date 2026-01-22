import { FunctionComponent, useEffect } from "react";
import { Body1, Modal, styled, TextInput } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { Quiz } from "../../../store/slices/quiz";
import { hasRequiredValue } from "../../../utils/validation";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  title: string;
  setTitle: (title: string) => void;
  onDuplicate: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DuplicateQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  title,
  setTitle,
  onDuplicate,
  onCancel,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (quiz) {
      setTitle(`Copy of ${quiz.title}`);
    }
  }, [quiz]);

  if (!quiz) {
    return null;
  }

  return (
    <Modal
      id="duplicate-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.duplicate_quiz.title')}
      primaryButtonText={isLoading ? t('loading_messages.creating') : t('buttons.next')}
      primaryButtonDisabled={!hasRequiredValue(title) || isLoading}
      secondaryButtonText={t('buttons.back')}
      onPrimaryClick={() => {
        if (!hasRequiredValue(title)) { return; }
        onDuplicate(title);
      }}
      onSecondaryClick={() => {
        onCancel();
      }}
    >
      <FormContent>
        <TextInput
          label="Quiz name"
          placeholder={t('modals.duplicate_quiz.quiz_name_placeholder', { quiz_name: quiz.title })}
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
  gap: 16px;
`;

const Description = styled(Body1)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;