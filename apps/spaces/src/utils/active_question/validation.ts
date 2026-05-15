import { ActiveQuestion, EmailContent, MessagingContent } from "../../store/types/active_question"
import {
  EMAIL_CONTENT_MAX_LENGTH,
  MESSAGE_CONTENT_MAX_LENGTH,
  QUESTION_NAME_MAX_LENGTH,
  SENDER_EMAIL_MAX_LENGTH,
  SENDER_NAME_MAX_LENGTH,
  SENDER_PHONE_MAX_LENGTH
} from "../inputLimits"
import { hasRequiredValue } from "../validation"

const getEditorTextLength = (content?: string) => {
  if (!content) { return 0 }

  return new DOMParser().parseFromString(content, 'text/html').body.textContent?.length ?? 0
}

export const isQuestionInfoStepValid = (question?: ActiveQuestion) => {
  if (!question?.app) {
    return false
  }

  return hasRequiredValue(question.name)
    && question.name.length <= QUESTION_NAME_MAX_LENGTH
}

export const isQuestionContentStepValid = (question?: ActiveQuestion) => {
  if (!question?.app || !question.content) {
    return false
  }

  if (question.app.type === 'email') {
    return isEmailContentValid(question.content)
  }

  if (question.app.type === 'messaging') {
    return isMessagingContentValid(question.content, question.app.name)
  }

  return true
}

const isEmailContentValid = (content: EmailContent) => {
  return hasRequiredValue(content.senderName?.value ?? '')
    && hasRequiredValue(content.senderEmail?.value ?? '')
    && content.senderName?.value.length <= SENDER_NAME_MAX_LENGTH
    && content.senderEmail?.value.length <= SENDER_EMAIL_MAX_LENGTH
    && getEditorTextLength(content.body?.value) <= EMAIL_CONTENT_MAX_LENGTH
}

const isMessagingContentValid = (content: MessagingContent, appName: string) => {
  const textItemsWithinLimit = (content.draggableItems ?? [])
    .filter(item => item.contentType === 'editor')
    .every(item => getEditorTextLength(item.value) <= MESSAGE_CONTENT_MAX_LENGTH)

  if (['SMS', 'Whatsapp'].includes(appName)) {
    return hasRequiredValue(content.senderPhone?.value ?? '')
      && content.senderPhone?.value.length <= SENDER_PHONE_MAX_LENGTH
      && textItemsWithinLimit
  }

  return hasRequiredValue(content.senderName?.value ?? '')
    && content.senderName?.value.length <= SENDER_NAME_MAX_LENGTH
    && textItemsWithinLimit
}
