import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";


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

  const [newUrl, handleUrl] = useState(url)

  return (
      <Modal
        isOpen={true}
        title={`Edit link`}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        leftButtonText="Delete"
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
            In the quiz, this link will appear clickable, but for safety reasons, clicking on it will not open the URL.
          </Body1>
          <TextInput
            label="Link URL"
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