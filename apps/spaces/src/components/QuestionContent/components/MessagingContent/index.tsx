import { FunctionComponent, useEffect, useState } from "react";
import { Body2Regular, Body3, styled, SubHeading3, TextInput } from '@shira/ui'
import { EmailContent as EmailContentType, QuestionToBe } from "../../../QuestionFlowManagement/types";
import { AttachmentFile, Attachments } from "../Attachments";
import { InputWithExplanation } from "../../../InputWithExplanation";
import { remapHtml } from "../../../../utils/remapHtml";
import { DraggableMessagingList } from "./DraggableMessagingList";
import { ImageObject, MessagingDragItem } from "./interfaces/MessagingDragItem";


interface Props {
  question: QuestionToBe
  content: Object
  handleContent: (id: string, value: string) => void
  handleQuestion: (k, v) => void
  handleContentFullChange: (newContent: Object) => void
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
  handleQuestion,
  handleContent,
  handleContentFullChange
}) => {

  const hasSenderPhone = () => {
      if (question && question.app) {
        return !!([
          MessagingAppsNames.SMS,
          MessagingAppsNames.WHATSAPP
        ].includes(question.app.name))
      }

      return false
  }

  const [initialStates, handleInitialStates] = useState<Object>({})
  const [senderPhoneEnabled, handleSenderPhoneEnabled] = useState<boolean>(false)

  const insertExplanation = (e) => {
    return e ? ` data-explanation='${e}' ` : ''  
  }


  useEffect(() => {
    const html = remapHtml(content)
    if (html) {
      const senderName = html.getElementById('component-required-sender-name')
      const senderPhone = html.getElementById('component-required-sender-phone')

      handleInitialStates({
        'component-required-sender-name': senderName ? senderName.getAttribute('data-explanation') : null,
        'component-required-sender-phone': senderPhone ? senderPhone.getAttribute('data-explanation') : null,
      })
    }
    
    handleSenderPhoneEnabled(hasSenderPhone)
  }, [])

  const remapDynamicContent = (newItems: Array<MessagingDragItem>) => {
    let newContent = {
      'component-required-sender-name': content['component-required-sender-name'],
      'component-required-sender-phone': content['component-required-sender-phone']
    }

    newItems.forEach((ni, i) => {
      let index = i + 1
      
      if (ni.type === 'text') {
        newContent[`component-text-${index}`] = `<div data-position=${index} id=component-text-${index} ${insertExplanation(null)}>${ni.value || ''}</div>` 
      }

      if (ni.type === 'image') {
        const imageObject = ni.value as ImageObject
        let objectAttributes = ''
        if (imageObject) {
          objectAttributes = `data-image-id=${imageObject.id} alt=${imageObject.originalFilename} src=${imageObject.url}`
        }
        newContent[`component-image-${index}`] = `<img data-position=${index} id=component-image-${index} ${insertExplanation(null)} ${objectAttributes} />` 
      }      
    })

    handleContentFullChange(newContent)
  }

  return (
    <Content>
   
      <div>
        <InputHeading $required={!senderPhoneEnabled}>
          <SubHeading3>Sender name</SubHeading3>
          <Body3>This is the name that will be displayed in the “Sender” field of the message.</Body3>
        </InputHeading>

        <InputWithExplanation 
          id='component-required-sender-name'
          name='sender-name'
          placeholder='Sender name'
          label="Sender name"
          initialExplanationValue={initialStates['component-required-sender-name']}
          value={question.messagingContent.senderName}
          onChange={(expl, value) => {
            handleQuestion('messagingContent', {
              ...question.messagingContent,
              senderName: value
            })
            handleContent(
              'component-required-sender-name', 
              `<span ${insertExplanation(expl)} id=component-required-sender-name>${value}</span>` 
            )          
          }}
        />
      </div>

      { senderPhoneEnabled && (
        <div>
          <InputHeading $required={true}>
            <SubHeading3>Sender phone</SubHeading3>
            <Body3>This is the phone number that will be displayed in the “Sender” field of the message.</Body3>
          </InputHeading>
        
          <InputWithExplanation 
            id='component-required-sender-phone'
            name='sender-phone'
            placeholder='Sender phone'
            label="Sender phone"
            value={question.messagingContent.senderPhone}
            initialExplanationValue={initialStates['component-required-sender-phone']}
            onChange={(expl, value) => {
              handleQuestion('messagingContent', {
                ...question.messagingContent,
                senderPhone: value
              })
              handleContent(
                'component-required-sender-phone', 
                `<span ${insertExplanation(expl)} id=component-required-sender-phone>${value}</span>` 
              )
            }}
          />
        </div>
      )}

      <DraggableMessagingList
        content={content}
        items={question.messagingContent.draggableItems}
        onRemapContent={remapDynamicContent}
        onChange={(newItems) => {
          console.log('ON CHANGE =>>> ', newItems)
          handleQuestion('messagingContent', {
            ...question.messagingContent,
            draggableItems: newItems
          })

          remapDynamicContent(newItems as Array<MessagingDragItem>)
        }}
      />
   
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