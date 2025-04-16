import { FunctionComponent, useEffect, useState } from "react";
import { Body2Regular, Body3, styled, SubHeading3, TextInput } from '@shira/ui'
import { EmailContent as EmailContentType, QuestionToBe } from "../../../QuestionManagementLayout/types";
import { EmailTipTapEditor } from "../../../TipTapEditor/EmailTipTapEditor";
import { AttachmentFile, Attachments } from "../Attachments";
import { InputWithExplanation } from "../../../InputWithExplanation";
import { remapHtml } from "../../../../utils/remapHtml";

interface Props {
  question: QuestionToBe
  content: Object
  handleContent: (id: string, value: string) => void
  handleQuestion: (k, v) => void
}

export const EmailContent: FunctionComponent<Props> = ({
  question,
  content,
  handleQuestion,
  handleContent
}) => {

  const [initialStates, handleInitialStates] = useState<Object>({})
  const insertExplanation = (e) => {
    return e ? ` data-explanation='${e}' ` : ''  
  }

  useEffect(() => {
    const html = remapHtml(content)
    console.log("🚀 ~ useEffect ~ html:", html)
    if (html) {
      const senderName = html.getElementById('component-required-sender-name')
      const senderEmail = html.getElementById('component-required-sender-email')
      const senderSubject = html.getElementById('component-optional-subject')

      handleInitialStates({
        'component-required-sender-name': senderName ? senderName.getAttribute('data-explanation') : null,
        'component-required-sender-email': senderEmail ? senderEmail.getAttribute('data-explanation') : null,
        'component-optional-subject': senderSubject ? senderSubject.getAttribute('data-explanation') : null
      })
    }

  }, [])

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
          initialExplanationValue={initialStates['component-required-sender-name']}
          value={question.emailContent.senderName}
          onChange={(expl, value) => {
            handleQuestion('emailContent', {
              ...question.emailContent,
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
          value={question.emailContent.senderEmail}
          initialExplanationValue={initialStates['component-required-sender-email']}
          onChange={(expl, value) => {
            handleQuestion('emailContent', {
              ...question.emailContent,
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
          initialExplanationValue={initialStates['component-optional-subject']}
          value={question.emailContent.subject}
          label="Subject"
          onChange={(expl, value) => {
            handleQuestion('emailContent', {
              ...question.emailContent,
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
          initialContent={question.emailContent.body}
          onChange={(emailText) => {
            console.log("EMAIL TEXT", emailText)
            handleQuestion('emailContent', {
              ...question.emailContent,
              body: emailText
            })
            handleContent(
              'component-text-1', 
              `<div data-position=1 id=component-text-1>${emailText}</div>`
            )
          }}
        />
      </div>

      <div>
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