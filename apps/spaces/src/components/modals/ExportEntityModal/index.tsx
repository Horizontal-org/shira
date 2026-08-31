import { FunctionComponent, useState } from "react";
import { Body1, Link1, Modal } from "@horizontal-org/shira-ui";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { GenericErrorModal } from "../ErrorModal";
import { exportEntity } from "../../../fetch/quiz";

interface Props {
  entityId: string | null;
  entityType: 'question' | 'quiz';
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
}

export const ExportEntityModal: FunctionComponent<Props> = ({
  entityId,
  entityType,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  const [requestErrored, handleRequestError] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleClose = () => {
    handleRequestError(false)
    setIsModalOpen(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportEntity(entityId, entityType);
      handleClose()
    } catch (error) {
      handleRequestError(true);
    } finally {
      setIsExporting(false);
    }
  };

  return requestErrored ? (
    <GenericErrorModal
      isOpen={true}
      errorMessage={t(`modals.export.${entityType}.error`)}
      onCancel={handleClose}
      onRetry={handleExport}
    />
  ) : (
    <Modal
      id="change-email-modal"
      isOpen={isModalOpen}
      title={t(`modals.export.${entityType}.title`)}
      primaryButtonText={isExporting ? t('modals.export.exporting') : t(`modals.export.${entityType}.title`)}
      primaryButtonDisabled={isExporting}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={handleExport}
      onSecondaryClick={handleClose}
      onClose={handleClose}
    >
      <ModalContent>
        <Body1>
          {t(`modals.export.${entityType}.file_type`)}
        </Body1>
        <Body1>
          <Trans
            i18nKey={`modals.export.${entityType}.sharing_implications`}
            values={{ learn_more: "Learn more" }}
            components={{
              1: <Link1
                target="_blank"
                key="learn-more"
                href="https://shira.app/spaces"
              />
            }}
          />
        </Body1>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
