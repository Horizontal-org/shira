import { FunctionComponent } from "react";
import { Body1, Modal, styled, VariableIcon } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
}

export const VariablesHelpModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isModalOpen}
      titleIcon={
        <SvgWrapper>
          <VariableIcon />
        </SvgWrapper>
      }
      title="Variables"
      primaryButtonText={t('buttons.ok')}
      primaryButtonDisabled={false}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        setIsModalOpen(false);
      }}
    >
      <div>
        <Body1>
          {t('modals.variables_modal.message')}
        </Body1>
        <MiddleBody1>
          {t('modals.variables_modal.message2')}
        </MiddleBody1>
        <MiddleBody1>
          {t('modals.variables_modal.message3')}
        </MiddleBody1>
        <VariableList role="list">
          <VariableItem role="listitem">
            <VariableTag>{`{{${t('modals.variables_modal.name')}}}`}</VariableTag>
            <Body1>{t('modals.variables_modal.name_explanation')}</Body1>
          </VariableItem>
          <VariableItem role="listitem">
            <VariableTag>{`{{${t('modals.variables_modal.email')}}}`}</VariableTag>
            <Body1>{t('modals.variables_modal.email_explanation')}</Body1>
          </VariableItem>
        </VariableList>
      </div>
    </Modal>
  );
};

const MiddleBody1 = styled(Body1)`
  padding-top: 16px;
`;

const SvgWrapper = styled.div`
  width: 28px;
  height: 28px;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

const VariableList = styled.ul`
  padding-left: 16px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const VariableItem = styled.li`
  display: flex;
  gap: 10px;
`;

const VariableTag = styled.span`
  background: #f3f3f3;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 600;
  height: max-content;
`;