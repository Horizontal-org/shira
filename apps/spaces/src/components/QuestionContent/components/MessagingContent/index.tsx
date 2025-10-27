import { FunctionComponent, useEffect, useState } from "react";
import { Body1SemiBold, Body3, styled, SubHeading3 } from '@shira/ui'
import { InputWithExplanation } from "../../../InputWithExplanation";
import { DraggableMessagingList } from "./DraggableMessagingList";
import { ActiveQuestion, MessagingContent as MessagingContentType } from "../../../../store/types/active_question";
import { useStore } from "../../../../store";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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

      {senderPhoneEnabled ? (
        <div>
          <InputHeading $required={true}>
            <SubHeading3>{t('create_question.tabs.content.sender_phone.title')}</SubHeading3>
            <Body3>{t('create_question.tabs.content.sender_phone.subtitle')}</Body3>
          </InputHeading>

          <InputWithExplanation
            id='component-required-phone'
            name='senderPhone'
            placeholder={t('create_question.tabs.content.sender_phone.placeholder')}
            label="Sender phone number"
            contentObject={content.senderPhone}
          />
        </div>
      ) : (
        <div>
          <InputHeading $required={!senderPhoneEnabled}>
            <SubHeading3>{t('create_question.tabs.content.sender.title')}</SubHeading3>
            <Body3>{t('create_question.tabs.content.sender.subtitle')}</Body3>
          </InputHeading>

          <InputWithExplanation
            id='component-required-fullname'
            name='senderName'
            placeholder={t('create_question.tabs.content.sender.placeholder')}
            label="Sender name"
            contentObject={content.senderName}
          />
        </div>
      )}

      <div>
        <MessagingContentHead>
          <Body1SemiBold>
            {t('create_question.tabs.content.message_content.title')}
          </Body1SemiBold>
          <Body3>
            {t('create_question.tabs.content.message_content.subtitle')}
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