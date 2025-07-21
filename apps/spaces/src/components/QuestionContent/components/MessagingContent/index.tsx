import { FunctionComponent, useEffect, useState } from "react";
import { Body2Regular, Body3, styled, SubHeading3, TextInput } from '@shira/ui'
import { EmailContent as EmailContentType, QuestionToBe } from "../../../QuestionFlowManagement/types";
import { AttachmentFile, Attachments } from "../Attachments";
import { InputWithExplanation } from "../../../InputWithExplanation";
import { remapHtml } from "../../../../utils/remapHtml";
import { DraggableMessagingList } from "./DraggableMessagingList";


interface Props {
  question: QuestionToBe
  content: Object
  handleContent: (id: string, value: string) => void
  handleQuestion: (k, v) => void
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
  handleContent
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
        onContentChange={handleContent}
        onChange={(newItems) => {
          console.log('ON CHANGE =>>> ', newItems)
          handleQuestion('messagingContent', {
            ...question.messagingContent,
            draggableItems: newItems
          })
        }}
      />
      
      {/* <div> */}
        {/* <SubHeading3>Email body content</SubHeading3>
        <Body2Regular>Write the message that will be shown.</Body2Regular> */}
        {/* <EmailTipTapEditor 
          initialContent={question.emailContent.body}
          onChange={(emailText) => {
            handleQuestion('emailContent', {
              ...question.emailContent,
              body: emailText
            })
            handleContent(
              'component-text-1', 
              `<div data-position=1 id=component-text-1>${emailText}</div>`
            )
          }}
        /> */}
      {/* </div> */}
      

      {/* <div>
        <Attachments 
          files={question.attachments}          
          onChange={(filesList: AttachmentFile[], f: AttachmentFile) => {
            handleQuestion('attachments', filesList)
            if (f) {
              handleContent(
                `component-attachment-${f.id}`,
                `<span data-attachment-type='${f.type}' data-position='${f.id}' ${insertExplanation(f.explanationIndex)} id='component-attachment-${f.id}'>${f.name}</span>`
              )
            }
          }}
        />
      </div> */}
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