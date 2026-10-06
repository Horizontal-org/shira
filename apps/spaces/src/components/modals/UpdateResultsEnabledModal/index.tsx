import { FunctionComponent } from "react";
import { Body1, Modal } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
  onConfirm: () => void
  action: 'enable' | 'disable'
}

export const UpdateResultsEnabledModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  action
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      id="update-results-enabled-modal"
      isOpen={isModalOpen}
      title={t(`modals.update_results_enabled.title_${action}`)}
      primaryButtonText={t('buttons.ok')}
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
          {t(`modals.update_results_enabled.content_${action}`)}
        </Body1>
      </div>
    </Modal>
  )
}
