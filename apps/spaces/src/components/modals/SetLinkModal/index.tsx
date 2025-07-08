import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Modal, ModalType, TextInput } from "@shira/ui";
import styled from "styled-components";

import { Quiz } from "../../../store/slices/quiz";

interface Props {
  // isModalOpen: boolean;
  // setIsModalOpen: (handle: boolean) => void
  previous?: string;
  onSubmit: (url: string) => void
  onCancel: () => void
}

export const SetLinkModal: FunctionComponent<Props> = ({
  // isModalOpen,
  // setIsModalOpen,
  onSubmit,
  onCancel,
  previous = null
}) => {

  const [url, handleUrl] = useState(previous)

  return (
      <Modal
        isOpen={true}
        title={`Set Link`}
        primaryButtonText="OK"
        secondaryButtonText="Cancel"
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
            In the quiz, this link will appear clickable, but for safety reasons, clicking on it will not open the URL.
          </Body1>
          <TextInput
            label="Link URL"
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
`;