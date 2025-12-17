import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, TextInput, styled } from "@shira/ui";
import { Quiz } from "../../../store/slices/quiz";
import { useTranslation } from "react-i18next";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  onDuplicate: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialTitle?: string;
}

export const DuplicateQuizModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  onDuplicate,
  onCancel,
  isLoading = false,
  initialTitle,
}) => {

  const { t } = useTranslation();
  const [title, handleTitle] = useState('');

  useEffect(() => {
    if (quiz) {
      if (initialTitle) {
        handleTitle(initialTitle);
      } else {
        handleTitle(t('modals.duplicate_quiz.quiz_name_placeholder', { quiz_name: quiz.title }));
      }
    } else {
      handleTitle('');
    }
  }, [quiz, initialTitle, t]);

  if (!quiz) {
    return null;
  }

  return (
    <Modal
      id="duplicate-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.duplicate_quiz.title')}
      primaryButtonText={isLoading ? t('loading_messages.creating') : t('buttons.save')}
      primaryButtonDisabled={(!title || title.trim() === "") || isLoading}
      secondaryButtonText={t('buttons.back')}
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
        <Description>{t('modals.duplicate_quiz.subtitle')}</Description>
        <TextInput
          label="Quiz name"
          placeholder={t('modals.duplicate_quiz.quiz_name_placeholder', { quiz_name: quiz.title })}
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