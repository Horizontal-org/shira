import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: () => void
}

export const ExitQuestionHandleModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isModalOpen}
      title={`Are you sure you want to exit the question?`}
      type={ModalType.Danger}
      primaryButtonText={t('buttons.exit')}
      primaryButtonDisabled={false}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        onConfirm()
        setIsModalOpen(false);
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false)
      }}
    >
      <div>
        <Body1>
          Any unsaved changes will be lost.
        </Body1>
      </div>
    </Modal>
  )
}
