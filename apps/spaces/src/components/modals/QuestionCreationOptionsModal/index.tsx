import { FunctionComponent, useState } from "react";
import { Body1, Body1SemiBold, Body2Regular, Body3, Link1, Link2, Modal, RenameIcon } from "@horizontal-org/shira-ui";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { GenericErrorModal } from "../ErrorModal";
import { exportEntity } from "../../../fetch/quiz";
import { MdMenuBook } from "react-icons/md";

interface Props {
  entityType: 'question' | 'quiz';
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  isPublicLibraryEnabled?: boolean;
  onAction: (action: 'template' | 'scratch' | 'import') => void
}

export const EntityCreationOptionsModal: FunctionComponent<Props> = ({
  entityType,
  isModalOpen,
  setIsModalOpen,
  isPublicLibraryEnabled,
  onAction
}) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAction = () => {
    console.log('something')
  };

  return (
    <Modal
      id="create-entity-modal"
      size="medium"
      isOpen={isModalOpen}
      title={t(`modals.create_entity.${entityType}.title`)}
      subtitle={t(`modals.create_entity.${entityType}.subtitle`)}
      primaryButtonText={t(`modals.create_entity.${entityType}.create_button`)}
      primaryButtonDisabled={false}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={handleAction}
      onSecondaryClick={handleClose}
      onClose={handleClose}
    >
      <ModalContent>
        <Actions>
          {isPublicLibraryEnabled && (
            <CreationActionCard onClick={() => { onAction('template') }}>
              <IconWrapper>
                <MdMenuBook size={20} />
              </IconWrapper>
              <TextContent>
                <Body1SemiBold>
                  {t(`modals.create_entity.${entityType}.template_title`)}
                </Body1SemiBold>
                <Body3>
                  {t(`modals.create_entity.${entityType}.template_subtitle`)}
                </Body3>
              </TextContent>
            </CreationActionCard>
          )}
          <CreationActionCard onClick={() => { onAction('scratch') }}>
            <RenameIconWrapper>
              <RenameIcon />
            </RenameIconWrapper>
            <TextContent>
              <Body1SemiBold>
                {t(`modals.create_entity.${entityType}.scratch_title`)}
              </Body1SemiBold>
              <Body3>
                {t(`modals.create_entity.${entityType}.scratch_subtitle`)}
              </Body3>
            </TextContent>
          </CreationActionCard>
        </Actions>

        <ImportBox>
          <Link1
            onClick={() => { onAction('import') }}
          >
            {t(`modals.create_entity.${entityType}.import_title`)}
          </Link1>
        </ImportBox>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
`;

const ImportBox = styled.div`
  text-align: center;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CreationActionCard = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  border-radius: 28px;
  display: flex;
  gap: 16px;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  min-width: 55px;
  height: 55px;
  min-height: 55px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.light.paleGreen};

  > svg {
    color: ${props => props.theme.colors.green7};
  }
`

const RenameIconWrapper = styled(IconWrapper)`

  >svg {
    width: 18px;
    height: 18px;
    > path {
      fill: ${props => props.theme.colors.green7};
    }
  }
`

const TextContent = styled.div`
  
`