import { FunctionComponent } from "react";
import { Body1, Modal } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: () => void
}

export const NoExplanationsModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      id="no-explanations-modal"
      isOpen={isModalOpen}
      title={t('modals.no_explanations.title')}
      primaryButtonText={t('buttons.continue')}
      primaryButtonDisabled={false}
      secondaryButtonText={t('modals.no_explanations.add')}
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
          {t('modals.no_explanations.message')}
        </Body1>
      </div>
    </Modal>
  )
}
