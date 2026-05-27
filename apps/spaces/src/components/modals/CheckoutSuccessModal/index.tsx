import { Body1, Modal } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
}

export const CheckoutSuccessModal: FunctionComponent<Props> = ({
  isModalOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      id="checkout-success-modal"
      isOpen={isModalOpen}
      title={t("settings.checkout_success.all_done")}
      primaryButtonText={t("buttons.back_to_quizzes")}
      secondaryButtonText=""
      onPrimaryClick={onClose}
      onClose={onClose}
    >
      <Body1>{t("settings.checkout_success.success_message")}</Body1>
    </Modal>
  );
};
