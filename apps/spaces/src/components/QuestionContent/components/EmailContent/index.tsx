import { FunctionComponent, useEffect, useState } from "react";
import { Body2Regular, Body3, styled, SubHeading3, TextInput } from '@shira/ui'
import { EmailTipTapEditor } from "../../../TipTapEditor/EmailTipTapEditor";
import { Attachments } from "../Attachments";
import { InputWithExplanation } from "../../../InputWithExplanation";
import { ActiveQuestion, EmailContent as EmailContentType, QuestionDragAttachment } from "../../../../store/types/active_question";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../../store";

interface Props {
  question: ActiveQuestion
  content: EmailContentType
}

export const EmailContent: FunctionComponent<Props> = ({
  question,
  content,
}) => {

  const {    
    updateActiveQuestionInput,
    updateActiveQuestionDraggableItems
  } = useStore((state) => ({
    updateActiveQuestionInput: state.updateActiveQuestionInput,
    updateActiveQuestionDraggableItems: state.updateActiveQuestionDraggableItems
  }), shallow)


  return (
    <Content>
   
      <div>
        <InputHeading $required={true}>
          <SubHeading3>Sender name</SubHeading3>
          <Body3>This is the name that will be displayed in the “Sender” field of the email.</Body3>
        </InputHeading>

        <InputWithExplanation 
          id='component-required-sender-name'
          name='senderName'
          placeholder='Sender name'
          label="Sender name"
          contentObject={content.senderName}
        />
      </div>

      <div>
        <InputHeading $required={true}>
          <SubHeading3>Sender email address</SubHeading3>
          <Body3>This is the email address that will be displayed in the “Sender” field of the email.</Body3>
        </InputHeading>
      
        <InputWithExplanation 
          id='component-required-sender-email'
          name='senderEmail'
          placeholder='Sender email'
          label="Sender email"
          contentObject={content.senderEmail}
        />      

      </div>

      <div>
        <InputHeading $required={false}>
          <SubHeading3>Email subject</SubHeading3>
          <Body3>This will be displayed in the “Subject” field of the email. If you keep this field empty, the subject field will show “(no subject)”.</Body3>
        </InputHeading>

        <InputWithExplanation 
          id='component-optional-subject'
          name='subject'
          placeholder='Subject'
          contentObject={content.subject}
          label="Subject"
        />

      </div>
      
      <div>
        <SubHeading3>Email body content</SubHeading3>
        <Body2Regular>Write the message that will be shown.</Body2Regular>
        <EmailTipTapEditor 
          initialContent={content.body.value}
          onChange={(emailText) => {
            updateActiveQuestionInput('body', 'value', emailText)
          }}
        />
      </div>

      <div>
        <Attachments
          content={content}
          files={content.draggableItems}          
          onChange={(filesList: QuestionDragAttachment[]) => {
            console.log("🚀 ~ filesList:", filesList)
            updateActiveQuestionDraggableItems(filesList)
          }}
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