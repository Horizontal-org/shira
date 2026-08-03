import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, TextInput } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (displayName: string) => void;
}

export const DisplayNameModal: FunctionComponent<Props> = ({ isOpen, onCancel, onSave }) => {
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState("");
  const trimmedDisplayName = displayName.trim();

  useEffect(() => {
    if (!isOpen) setDisplayName("");
  }, [isOpen]);

  return (
    <Modal
      id="create-display-name-modal"
      isOpen={isOpen}
      title={t("templates.display_name.title")}
      primaryButtonText={t("buttons.save")}
      primaryButtonDisabled={!trimmedDisplayName}
      secondaryButtonText={t("buttons.cancel")}
      onPrimaryClick={() => onSave(trimmedDisplayName)}
      onSecondaryClick={onCancel}
      onClose={onCancel}
    >
      <ModalContent>
        <Body1>{t("templates.display_name.description")}</Body1>
        <TextInput
          id="display-name-input"
          label={t("templates.display_name.input")}
          onChange={(event) => setDisplayName(event.target.value)}
          value={displayName}
          showCharacterCount
          maxLength={80}
        />
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
