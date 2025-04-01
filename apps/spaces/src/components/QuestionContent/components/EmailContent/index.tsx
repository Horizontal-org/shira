import { FunctionComponent, useEffect, useState } from "react";
import { Body2Regular, Body3, styled, SubHeading3, TextInput } from '@shira/ui'
import { EmailContent as EmailContentType, QuestionToBe } from "../../../QuestionManagementLayout/types";
import { BaseTipTapEditor } from "../../../TipTapEditor/BaseTipTapEditor";
import { EmailTipTapEditor } from "../../../TipTapEditor/EmailTipTapEditor";
import { Attachments } from "../Attachments";
import { InputWithExplanation } from "../../../InputWithExplanation";

interface Props {
  question: QuestionToBe
  handleContent: (id: string, value: string) => void
}

export const EmailContent: FunctionComponent<Props> = ({
  question,
  handleContent
}) => {

  const [emailContent, handleEmailContent] = useState<EmailContentType>({
    senderEmail: '',
    senderName: '',
    subject: '',
    body: ''
  })

  const insertExplanation = (e) => {
    return e ? ` data-explanation='${e}' ` : ''  
  }

  return (
    <Content>
   
      <div>
        <InputHeading $required={true}>
          <SubHeading3>Sender name</SubHeading3>
          <Body3>This is the name that will be displayed in the “Sender” field of the email.</Body3>
        </InputHeading>

        <InputWithExplanation 
          id='component-required-sender-name'
          name='sender-name'
          placeholder='Sender name'
          label="Sender name"
          value={emailContent.senderName}
          onChange={(expl, value) => {
            handleEmailContent({
              ...emailContent,
              senderName: value
            })
            handleContent(
              'component-required-sender-name', 
              `<span ${insertExplanation(expl)} id=component-required-sender-name>${value}</span>` 
            )          
          }}
        />
      </div>

      <div>
        <InputHeading $required={true}>
          <SubHeading3>Sender email address</SubHeading3>
          <Body3>This is the email address that will be displayed in the “Sender” field of the email.</Body3>
        </InputHeading>
      
        <InputWithExplanation 
          id='component-required-sender-email'
          name='sender-email'
          placeholder='Sender email'
          label="Sender email"
          value={emailContent.senderEmail}
          onChange={(expl, value) => {
            handleEmailContent({
              ...emailContent,
              senderEmail: value
            })
            handleContent(
              'component-required-sender-email', 
              `<span ${insertExplanation(expl)} id=component-required-sender-email>${value}</span>` 
            )          
          }}
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
          value={emailContent.subject}
          label="Subject"
          onChange={(expl, value) => {
            handleEmailContent({
              ...emailContent,
              subject: value
            })
            handleContent(
              'component-optional-subject', 
              `<span ${insertExplanation(expl)} id=component-optional-subject>${value}</span>` 
            )          
          }}
        />

      </div>
      
      <div>
        <SubHeading3>Email body content</SubHeading3>
        <Body2Regular>Write the message that will be shown.</Body2Regular>
        <EmailTipTapEditor 
          onChange={(body) => {
            handleEmailContent({
              ...emailContent,
              body
            })
            handleContent(
              'component-text-1', 
              `<div data-position=1 id=component-text-1>${body}</div>`
            )
          }}
        />
      </div>

      <div>
        <Attachments />
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