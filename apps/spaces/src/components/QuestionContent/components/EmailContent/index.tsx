import { FunctionComponent, useEffect, useState } from "react";
import { Body2Regular, styled, SubHeading3, TextInput } from '@shira/ui'
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
      <SubHeading3>Email details</SubHeading3>
      <TextInput
        label="Sender name"
        value={emailContent.senderName}
        onChange={(e) => { 
          handleEmailContent({
            ...emailContent,
            senderName: e.target.value
          })
          handleContent(
            'component-required-sender-name', 
            `<span ${insertExplanation(null)} id=component-required-sender-name>${e.target.value}</span>` 
          )
        }}
      />
      <TextInput
        label="Sender email address"
        value={emailContent.senderEmail}
        onChange={(e) => { 
          handleEmailContent({
            ...emailContent,
            senderEmail: e.target.value
          })
          handleContent(
            'component-required-sender-email', 
            `<span ${insertExplanation(null)} id=component-required-sender-email>${e.target.value}</span>` 
          )
        }}
      />

      {/* <InputWithExplanation 
        id='component-optional-subject'
        name='subject'
        placeholder='Subject'
        value={emailContent.subject}
        onChange={(expl, value) => {
          // onChange(expl, value, 'component-optional-subject')
          handleEmailContent({
            ...emailContent,
            subject: value
          })
          handleContent(
            'component-optional-subject', 
            `<span ${insertExplanation(expl)} id=component-required-sender-email>${value}</span>` 
          )          
        }}
      /> */}
      <TextInput
        label="Subject"
        value={emailContent.subject}
        onChange={(e) => { 
          handleEmailContent({
            ...emailContent,
            subject: e.target.value
          })
          handleContent(
            'component-optional-subject', 
            `<span ${insertExplanation(null)} id=component-required-sender-email>${e.target.value}</span>` 
          )  
        }}
      />
      <Body2Regular>{`If you keep this field empty, the subject field will show “(no subject)”.`}</Body2Regular>
      
      <div>
        <SubHeading3>Email body content</SubHeading3>
        <Body2Regular>Write the message that will be shown.</Body2Regular>
        <EmailTipTapEditor 
          onChange={(body) => {
            console.log("🚀 ~ body:", body)
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