import { FunctionComponent } from "react";
import { Body2Regular, Body3, styled, SubHeading3 } from '@horizontal-org/shira-ui'
import { EmailTipTapEditor } from "../../../TipTapEditor/EmailTipTapEditor";
import { Attachments } from "../Attachments";
import { InputWithExplanation } from "../../../InputWithExplanation";
import { ActiveQuestion, EmailContent as EmailContentType, QuestionDragAttachment } from "../../../../store/types/active_question";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../../store";
import { useTranslation } from "react-i18next";
import { EMAIL_CONTENT_MAX_LENGTH, EMAIL_SUBJECT_MAX_LENGTH, SENDER_EMAIL_MAX_LENGTH, SENDER_NAME_MAX_LENGTH } from "../../../../utils/inputLimits";

interface Props {
  question: ActiveQuestion
  content: EmailContentType
}

export const EmailContent: FunctionComponent<Props> = ({
  content,
}) => {
  const { t } = useTranslation();

  const {
    updateActiveQuestionInput,
    updateActiveQuestionDraggableItems
  } = useStore((state) => ({
    updateActiveQuestionInput: state.updateActiveQuestionInput,
    updateActiveQuestionDraggableItems: state.updateActiveQuestionDraggableItems
  }), shallow)


  return (
    <Content id="email-content">

      <div>
        <InputHeading $required={true}>
          <SubHeading3 id="email-content-sender-title">{t('create_question.tabs.content.sender.title')}</SubHeading3>
          <Body3 id="email-content-sender-subtitle">{t('create_question.tabs.content.sender.subtitle')}</Body3>
        </InputHeading>

        <InputWithExplanation
          id='component-required-sender-name'
          name='senderName'
          placeholder={t('create_question.tabs.content.sender.placeholder')}
          label="Sender name"
          contentObject={content.senderName}
          showCharacterCount={true}
          maxLength={SENDER_NAME_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
        />
      </div>

      <div>
        <InputHeading $required={true}>
          <SubHeading3 id="email-content-sender-email-title">{t('create_question.tabs.content.sender_email.title')}</SubHeading3>
          <Body3 id="email-content-sender-email-subtitle">{t('create_question.tabs.content.sender_email.subtitle')}</Body3>
        </InputHeading>

        <InputWithExplanation
          id='component-required-sender-email'
          name='senderEmail'
          placeholder={t('create_question.tabs.content.sender_email.placeholder')}
          label="Sender email"
          contentObject={content.senderEmail}
          showCharacterCount={true}
          maxLength={SENDER_EMAIL_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
        />

      </div>

      <div>
        <InputHeading $required={false}>
          <SubHeading3 id="email-content-subject-title">{t('create_question.tabs.content.email_subject.title')}</SubHeading3>
          <Body3 id="email-content-subject-subtitle">{t('create_question.tabs.content.email_subject.subtitle')}</Body3>
        </InputHeading>

        <InputWithExplanation
          id='component-optional-subject'
          name='subject'
          placeholder={t('create_question.tabs.content.email_subject.placeholder')}
          contentObject={content.subject}
          label="Subject"
          showCharacterCount={true}
          maxLength={EMAIL_SUBJECT_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
        />

      </div>

      <div>
        <SubHeading3 id="email-content-email-body-content-title">{t('create_question.tabs.content.email_body_content.title')}</SubHeading3>
        <Body2Regular id="email-content-email-body-content-subtitle">{t('create_question.tabs.content.email_body_content.subtitle')}</Body2Regular>
        <EmailTipTapEditor
          initialContent={content.body.value}
          maxLength={EMAIL_CONTENT_MAX_LENGTH}
          characterLimitErrorText={t('error_messages.character_limit_error')}
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
  gap: 30px;
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