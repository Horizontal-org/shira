import { FunctionComponent, useEffect, useState } from "react";
import { Body1, Body1SemiBold, Body2Regular, Body3, styled, SubHeading3, TextInput } from '@shira/ui'
import { InputWithExplanation } from "../../../InputWithExplanation";
import { DraggableMessagingList } from "./DraggableMessagingList";
import { ActiveQuestion, MessagingContent as MessagingContentType } from "../../../../store/types/active_question";
import { useStore } from "../../../../store";
import { shallow } from "zustand/shallow";

interface Props {
  question: ActiveQuestion
  content: MessagingContentType
}

const MessagingAppsNames = {
  WHATSAPP: 'Whatsapp',
  SMS: 'SMS',
  MESSENGER: 'Messenger',
  DATING_APP: 'Dating App'
}

export const MessagingContent: FunctionComponent<Props> = ({
  question,
  content,
}) => {

  const {    
    updateActiveQuestionDraggableItems
  } = useStore((state) => ({
    updateActiveQuestionDraggableItems: state.updateActiveQuestionDraggableItems
  }), shallow)
  
  const hasSenderPhone = () => {
      if (question && question.app) {
        return !!([
          MessagingAppsNames.SMS,
          MessagingAppsNames.WHATSAPP
        ].includes(question.app.name))
      }

      return false
  }

  const [senderPhoneEnabled, handleSenderPhoneEnabled] = useState<boolean>(false)

  useEffect(() => {
    handleSenderPhoneEnabled(hasSenderPhone)
  }, [])

  return (
    <Content>
   
      { senderPhoneEnabled ? (
        <div>
          <InputHeading $required={true}>
            <SubHeading3>Sender phone</SubHeading3>
            <Body3>This is the phone number that will be displayed in the “Sender” field of the message.</Body3>
          </InputHeading>
        
          <InputWithExplanation 
            id='component-required-phone'
            name='senderPhone'
            placeholder='Sender phone number'
            label="Sender phone number"
            contentObject={content.senderPhone}
          />
        </div>
      ) : (
        <div>
          <InputHeading $required={!senderPhoneEnabled}>
            <SubHeading3>Sender name</SubHeading3>
            <Body3>This is the name that will be displayed in the “Sender” field of the message.</Body3>
          </InputHeading>

          <InputWithExplanation
            id='component-required-fullname'
            name='senderName'
            placeholder='Sender name'
            label="Sender name"
            contentObject={content.senderName}        
          />
        </div>
      )}

      <div>
        <MessagingContentHead>
          <Body1SemiBold>
            Message Content
          </Body1SemiBold>
          <Body3>
            Create the messages that will be shown. You can create multiple messages and image files. Add an explanation by selecting a portion of text and clicking on the explanation icon.
          </Body3>
        </MessagingContentHead>

        <DraggableMessagingList
          content={content}
          items={content.draggableItems}
          onChange={(newItems) => { updateActiveQuestionDraggableItems(newItems) }}
        />
      </div>
   
    </Content>
  )
}

const Content = styled.div`
  gap: 48px;
  display: flex;
  flex-direction: column;
`

const InputHeading = styled.div<{ $required: boolean }>`
  padding-bottom: 12px;

  > h5 {
   display: flex;

   ${props => props.$required && `
      &:before {
        content:"* ";
        color: red;
        padding-right: 4px;
      }
    `}
  }
  
`

const MessagingContentHead = styled.div`
  padding-bottom: 20px;
`