import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onConfirm: () => void;
}

export const ExitLearnerBulkImportModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="exit-learner-bulk-import-modal"
      isOpen={isModalOpen}
      title={t("modals.exit_bulk_import.title")}
      type={ModalType.Danger}
      primaryButtonText={t("buttons.exit")}
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
        <Body1>{t("modals.exit_bulk_import.message")}</Body1>
      </div>
    </Modal>
  );
};
