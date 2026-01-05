import { FunctionComponent } from "react";
import { Body1, Modal, ModalType } from "@shira/ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getContactUsLayout } from "../../../utils/getErrorContent";

interface Props {
  isOpen: boolean;
  errorMessage: string | null;
  onRetry: () => void;
  onCancel: () => void;
}

export const GenericErrorModal: FunctionComponent<Props> = ({
  isOpen,
  errorMessage,
  onRetry,
  onCancel,
}) => {
  const { t } = useTranslation();
  const translationKey = errorMessage ?? "error_messages.something_went_wrong";

  return (
    <Modal
      isOpen={isOpen}
      title={t("error_messages.something_went_wrong")}
      primaryButtonText={t("buttons.try_again")}
      secondaryButtonText={t("buttons.cancel")}
      type={ModalType.Danger}
      onPrimaryClick={onRetry}
      onSecondaryClick={onCancel}
    >
      <FormContent>
        <Body1>{getContactUsLayout(translationKey)}</Body1>
      </FormContent>
    </Modal>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;

  text-align: left;
`;
