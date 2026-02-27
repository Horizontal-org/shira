import { FunctionComponent } from "react";
import { Body1, Modal } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  inviteCount: number;
  onClose: () => void;
}

export const BulkInviteSentModal: FunctionComponent<Props> = ({
  isModalOpen,
  inviteCount,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="bulk-invite-sent-modal"
      size="small"
      isOpen={isModalOpen}
      title={t("modals.bulk_invite_sent.title")}
      primaryButtonText={t("buttons.continue")}
      secondaryButtonText={t("buttons.close")}
      onPrimaryClick={onClose}
      onClose={onClose}
    >
      <Body1>{t("modals.bulk_invite_sent.description", { count: inviteCount })}</Body1>
    </Modal>
  );
};
