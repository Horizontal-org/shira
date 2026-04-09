import { Body1, Modal } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  onViewPlans: () => void;
  planName: string;
}

export const FirstLoginModal: FunctionComponent<Props> = ({
  isModalOpen,
  onClose,
  onViewPlans,
  planName,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="first-login-modal"
      isOpen={isModalOpen}
      title={t("modals.first_login.title")}
      primaryButtonText={t("modals.first_login.actions.get_started")}
      secondaryButtonText={t("modals.first_login.actions.view_plans")}
      onPrimaryClick={onClose}
      onSecondaryClick={onViewPlans}
      onClose={onClose}
    >
      <Body1>{t("modals.first_login.description", { planName })}</Body1>
    </Modal>
  );
};
