import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  previous?: string;
  onSubmit: (url: string) => void
  onCancel: () => void
}

export const SetLinkModal: FunctionComponent<Props> = ({
  onSubmit,
  onCancel,
  previous = null
}) => {

  const { t } = useTranslation();
  const [url, handleUrl] = useState(previous)

  return (
    <Modal
      isOpen={true}
      title={t('create_question.tabs.content.link_text.set_title')}
      primaryButtonText={t('buttons.ok')}
      secondaryButtonText={t('buttons.cancel')}
      onPrimaryClick={() => {
        onSubmit(url)
        handleUrl('')
      }}
      onSecondaryClick={() => {
        handleUrl('')
        onCancel()
      }}
    >
      <FormContent>
        <Body1>
          {t('create_question.tabs.content.link_text.subtitle')}
        </Body1>
        <TextInput
          label={t('create_question.tabs.content.link_text.placeholder')}
          value={url}
          onChange={(e) => handleUrl(e.target.value)}
        />
      </FormContent>
    </Modal>
  )
}

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;