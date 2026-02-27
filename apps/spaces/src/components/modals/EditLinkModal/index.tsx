import { FunctionComponent, useState } from "react";
import { Body1, Modal, TextInput } from "@shira/ui";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


interface Props {
  onSubmit: (url: string) => void
  onCancel: () => void
  url: string
}

export const EditLinkModal: FunctionComponent<Props> = ({
  onSubmit,
  onCancel,
  url
}) => {

  const { t } = useTranslation();
  const [newUrl, handleUrl] = useState(url)

  return (
    <Modal
      isOpen={true}
      title={t('create_question.tabs.content.link_text.edit_title')}
      primaryButtonText={t('buttons.save')}
      secondaryButtonText={t('buttons.cancel')}
      leftButtonText={t('buttons.delete')}
      onLeftClick={() => {
        onSubmit('')
        handleUrl('')
      }}
      onPrimaryClick={() => {
        onSubmit(newUrl)
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
          value={newUrl}
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