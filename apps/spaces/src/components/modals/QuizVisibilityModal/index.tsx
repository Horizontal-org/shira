import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Body3, Body4, defaultTheme, Modal, styled } from "@shira/ui";
import { Quiz } from "../../../store/slices/quiz";
import { useTranslation } from "react-i18next";

interface Props {
  quiz: Quiz;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onSetQuizVisibility: (title: string) => void;
  onCancel: () => void;
}

export const QuizVisibilityModal: FunctionComponent<Props> = ({
  quiz,
  isModalOpen,
  setIsModalOpen,
  onSetQuizVisibility,
  onCancel
}) => {

  const { t } = useTranslation();
  const [title, handleTitle] = useState('');

  useEffect(() => {
    if (quiz) {
      handleTitle(quiz.title)
    }
  }, [quiz])

  return quiz && (
    <Modal
      id="quiz-visibility-modal"
      isOpen={isModalOpen}
      title={t('modals.quiz_visibility.title')}
      primaryButtonText={t('buttons.save')}
      secondaryButtonText={t('buttons.cancel')}
      primaryButtonDisabled={!title || title.trim() === ""}
      onPrimaryClick={() => {
        setIsModalOpen(false);
        onSetQuizVisibility(title);
        handleTitle('');
      }}
      onSecondaryClick={() => {
        handleTitle('');
        onCancel();
      }}
    >
      <Body1 id="quiz-visibility-modal-subtitle">{t('modals.quiz_visibility.subtitle')}</Body1>

      <FieldSet id="quiz-visibility-options">
        <OptionWrapper>
          <OptionRow>
            <input type="radio" id="public" name="visibility" value="public" checked />
            <label htmlFor="public">
              {t('modals.quiz_visibility.public_option.title')}
            </label>
          </OptionRow>

          <OptionDescription>
            {t('modals.quiz_visibility.public_option.description')}
          </OptionDescription>
        </OptionWrapper>

        <OptionWrapper>
          <OptionRow>
            <input type="radio" id="private" name="visibility" value="private" />
            <label htmlFor="private">
              {t('modals.quiz_visibility.private_option.title')}
            </label>
          </OptionRow>

          <OptionDescription>
            {t('modals.quiz_visibility.private_option.description')}
          </OptionDescription>
        </OptionWrapper>
      </FieldSet>

      <Body1>{t('modals.quiz_visibility.description')}</Body1>
    </Modal>
  )
};

const FieldSet = styled.fieldset`
  margin-top: 16px;
  margin-bottom: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionDescription = styled(Body3)`
  margin-left: 28px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;
