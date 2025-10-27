import { FunctionComponent } from "react";
import { Body1, ExplanationIcon, Modal, styled } from "@shira/ui";
import { useTranslation } from "react-i18next";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
}

export const ExplanationsHelpModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isModalOpen}
      titleIcon={<SvgWrapper><ExplanationIcon /></SvgWrapper>}
      title={t('modals.explanations_modal.title')}
      primaryButtonText={t('buttons.ok')}
      primaryButtonDisabled={false}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        setIsModalOpen(false);
      }}
    >
      <div>
        <Body1>
          {t('modals.explanations_modal.message')}
        </Body1>
        <MiddleBody1>
          {t('modals.explanations_modal.message2')}
        </MiddleBody1>
        <List>
          <li><Body1>{t('modals.explanations_modal.list.fields')}</Body1></li>
          <li><Body1>{t('modals.explanations_modal.list.content')}</Body1></li>
          <li><Body1>{t('modals.explanations_modal.list.attachments')}</Body1></li>
        </List>
      </div>
    </Modal>
  )
}

const MiddleBody1 = styled(Body1)`
  padding-top: 16px;
`

const List = styled.ul`
  margin: 8px 0;

  > li {
    
    &::marker {
      color: black;
      font-size: 0.6em;
    } 
  }
`

const SvgWrapper = styled.div`
  width: 28px;
  height: 28px;

  > svg {
    width: 100%;
    height: 100%; 
  }
`