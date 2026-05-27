import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onConfirm: () => void;
}

export const StartOverLearnerBulkImportModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="start-over-learner-bulk-import-modal"
      isOpen={isModalOpen}
      title={t("modals.start_over_bulk_import.title")}
      type={ModalType.Danger}
      primaryButtonText={t("buttons.start_over")}
      primaryButtonDisabled={false}
      secondaryButtonText={t("buttons.cancel")}
      onPrimaryClick={() => {
        onConfirm();
        setIsModalOpen(false);
      }}
      onSecondaryClick={() => {
        setIsModalOpen(false);
      }}
    >
      <div>
        <Body1>{t("modals.start_over_bulk_import.message")}</Body1>
      </div>
    </Modal>
  );
};
