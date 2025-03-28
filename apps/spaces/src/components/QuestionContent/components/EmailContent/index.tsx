import { FunctionComponent, useState } from "react";
import { Body2Regular, styled, SubHeading3, TextInput } from '@shira/ui'
import { EmailContent as EmailContentType, QuestionToBe } from "../../../QuestionManagementLayout/types";
import { BaseTipTapEditor } from "../../../TipTapEditor/BaseTipTapEditor";
import { EmailTipTapEditor } from "../../../TipTapEditor/EmailTipTapEditor";

interface Props {
  question: QuestionToBe
  handleQuestion: (k, v) => void;
}

export const EmailContent: FunctionComponent<Props> = ({
  question,
  handleQuestion
}) => {
  // const editorId = `component-text-${componentId}`

  const [emailContent, handleEmailContent] = useState<EmailContentType>(question.content || {
    senderEmail: '',
    senderName: '',
    subject: ''
  })

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
        }}
      />
      <TextInput
        label="Subject"
        value={emailContent.subject}
        onChange={(e) => { 
          handleEmailContent({
            ...emailContent,
            subject: e.target.value
          })
        }}
      />
      <Body2Regular>{`If you keep this field empty, the subject field will show “(no subject)”.`}</Body2Regular>
      
      <div>
        <SubHeading3>Email body content</SubHeading3>
        <Body2Regular>Write the message that will be shown.</Body2Regular>
        <EmailTipTapEditor />
      </div>
    </Content>
  )
}

const Content = styled.div`
  gap: 48px;
  display: flex;
  flex-direction: column;
`