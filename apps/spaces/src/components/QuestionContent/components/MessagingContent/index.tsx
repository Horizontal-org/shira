import { FunctionComponent, useEffect, useState } from "react";
import { Body2Regular, Body3, styled, SubHeading3, TextInput } from '@shira/ui'
import { EmailContent as EmailContentType, QuestionToBe } from "../../../QuestionFlowManagement/types";
import { InputWithExplanation } from "../../../InputWithExplanation";
import { remapHtml } from "../../../../utils/remapHtml";
import { DraggableMessagingList } from "./DraggableMessagingList";
import { MessagingContent as MessagingContentType } from "../../../../store/types/active_question";
import { useStore } from "../../../../store";
import { shallow } from "zustand/shallow";


interface Props {
  question: QuestionToBe
  content: MessagingContentType
  handleContent?: (id: string, value: string) => void
  handleQuestion?: (k, v) => void
  handleContentFullChange?: (newContent: Object) => void
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

  const [initialStates, handleInitialStates] = useState<Object>({})
  const [senderPhoneEnabled, handleSenderPhoneEnabled] = useState<boolean>(false)

  const insertExplanation = (e) => {
    return e ? ` data-explanation='${e}' ` : ''  
  }


  useEffect(() => {
    // const html = remapHtml(content)
    // if (html) {
    //   const senderName = html.getElementById('component-required-fullname')
    //   const senderPhone = html.getElementById('component-required-phone')

    //   handleInitialStates({
    //     'component-required-fullname': senderName ? senderName.getAttribute('data-explanation') : null,
    //     'component-required-phone': senderPhone ? senderPhone.getAttribute('data-explanation') : null,
    //   })
    // }
    
    handleSenderPhoneEnabled(hasSenderPhone)
  }, [])

  // const remapDynamicContent = (newItems: Array<MessagingDragItem>) => {
  //   let newContent = {
  //     'component-required-fullname': content['component-required-fullname'],
  //     'component-required-phone': content['component-required-phone']
  //   }

  //   newItems.forEach((ni, i) => {
  //     let index = i + 1
      
  //     if (ni.type === 'text') {
  //       newContent[`component-text-${index}`] = `<div data-position=${index} id=component-text-${index}>${ni.value || ''}</div>` 
  //     }

  //     if (ni.type === 'image') {
  //       const imageObject = ni.value as ImageObject
  //       let objectAttributes = ''
  //       if (imageObject) {
  //         objectAttributes = `data-image-id=${imageObject.id} alt=${imageObject.originalFilename} src=${imageObject.url}`
  //       }
  //       newContent[`component-image-${index}`] = `<img data-position=${index} id=component-image-${index} ${insertExplanation(ni.explId || null)} ${objectAttributes} />` 
  //     }      
  //   })

  //   handleContentFullChange(newContent)
  // }

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
            placeholder='Sender phone'
            label="Sender phone"
            value={content.senderPhone.value}
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
            value={content.senderName.value}    
            contentObject={content.senderName}        
          />
        </div>
      )}

      <DraggableMessagingList
        content={content}
        items={content.draggableItems}
        onChange={(newItems) => {
          console.log("🚀 ~ newItems:", newItems)
          updateActiveQuestionDraggableItems(newItems)
          // handleQuestion('messagingContent', {
          //   ...question.messagingContent,
          //   draggableItems: newItems
          // })

          // remapDynamicContent(newItems as Array<MessagingDragItem>)
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