import { FunctionComponent, useState } from "react";
import { Body1, Modal, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  onPublish?: () => void;
}

export const PublishQuizAction: FunctionComponent<Props> = ({
  isModalOpen,
  onClose,
  onPublish,
}) => {
  const { t } = useTranslation();
 
  return (
    <Modal
      id="publish-private-quiz-modal"
      isOpen={isModalOpen}
      title={t('modals.publish_private_quiz.title')}
      primaryButtonText={t('modals.publish_private_quiz.submit')}
      secondaryButtonText={t('modals.publish_private_quiz.close')}
      onPrimaryClick={onPublish}
      onSecondaryClick={onClose}
    >
      <BodyWrapper>
        <Body1 id="publish-private-quiz-subtitle-1">{t('modals.publish_private_quiz.subtitle_1')}</Body1>
        <Body1 id="publish-private-quiz-subtitle-2">{t('modals.publish_private_quiz.subtitle_2')}</Body1>
      </BodyWrapper>
    </Modal>
  );
};


const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`