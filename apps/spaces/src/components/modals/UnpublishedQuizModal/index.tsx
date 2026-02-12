import { FunctionComponent } from "react";
import { Body1, Modal } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const UnpublishedQuizCopyLinkModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  onCancel
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      id="unpublished-quiz-copy-link-modal"
      isOpen={isModalOpen}
      title={t('modals.publish_quiz.title')}
      primaryButtonText={t('modals.publish_quiz.submit')}
      secondaryButtonText={t('modals.publish_quiz.close')}
      onPrimaryClick={() => {
        onConfirm();
        setIsModalOpen(false);
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false);
        onCancel?.();
      }}
    >
      <div>
        <Body1>
          {t('modals.publish_quiz.public_subtitle_1')}
        </Body1>
      </div>
    </Modal>
  )
}
