import { ActiveQuestion, EmailContent, MessagingContent } from "../../store/types/active_question"
import {
  EMAIL_CONTENT_MAX_LENGTH,
  EMAIL_SUBJECT_MAX_LENGTH,
  MESSAGE_CONTENT_MAX_LENGTH,
  QUESTION_NAME_MAX_LENGTH,
  SENDER_EMAIL_MAX_LENGTH,
  SENDER_NAME_MAX_LENGTH,
  SENDER_PHONE_MAX_LENGTH
} from "../inputLimits"
import { hasRequiredValue } from "../validation"

type QuestionStepValidationReason = 'required' | 'characterLimit'

export interface QuestionStepValidationResult {
  isValid: boolean
  reason?: QuestionStepValidationReason
}

const getEditorTextLength = (content?: string) => {
  if (!content) { return 0 }

  return new DOMParser().parseFromString(content, 'text/html').body.textContent?.length ?? 0
}

export const isQuestionInfoStepValid = (question?: ActiveQuestion) => {
  if (!question?.app) {
    return {
      isValid: false,
      reason: 'required'
    }
  }

  if (!hasRequiredValue(question.name)) {
    return {
      isValid: false,
      reason: 'required'
    }
  }

  if (question.name.length > QUESTION_NAME_MAX_LENGTH) {
    return {
      isValid: false,
      reason: 'characterLimit'
    }
  }

  return { isValid: true }
}

export const isQuestionContentStepValid = (question?: ActiveQuestion) => {
  if (!question?.app || !question.content) {
    return {
      isValid: false,
      reason: 'required'
    }
  }

  if (question.app.type === 'email') {
    return getEmailContentValidation(question.content)
  }

  if (question.app.type === 'messaging') {
    return getMessagingContentValidation(question.content, question.app.name)
  }

  return { isValid: true }
}

const getEmailContentValidation = (content: EmailContent) => {
  if (!hasRequiredValue(content.senderName?.value ?? '')
    || !hasRequiredValue(content.senderEmail?.value ?? '')) {
    return {
      isValid: false,
      reason: 'required'
    }
  }

  const isOverCharacterLimit = content.senderName?.value.length > SENDER_NAME_MAX_LENGTH
    || content.senderEmail?.value.length > SENDER_EMAIL_MAX_LENGTH
    || (content.subject?.value.length ?? 0) > EMAIL_SUBJECT_MAX_LENGTH
    || getEditorTextLength(content.body?.value) > EMAIL_CONTENT_MAX_LENGTH

  if (isOverCharacterLimit) {
    return {
      isValid: false,
      reason: 'characterLimit'
    }
  }

  return { isValid: true }
}

const getMessagingContentValidation = (content: MessagingContent, appName: string) => {
  const textItemsWithinLimit = (content.draggableItems ?? [])
    .filter(item => item.contentType === 'editor')
    .every(item => getEditorTextLength(item.value) <= MESSAGE_CONTENT_MAX_LENGTH)

  if (['SMS', 'WhatsApp'].includes(appName)) {
    if (!hasRequiredValue(content.senderPhone?.value ?? '')) {
      return {
        isValid: false,
        reason: 'required'
      }
    }

    if (content.senderPhone?.value.length > SENDER_PHONE_MAX_LENGTH || !textItemsWithinLimit) {
      return {
        isValid: false,
        reason: 'characterLimit'
      }
    }

    return { isValid: true }
  }

  if (!hasRequiredValue(content.senderName?.value ?? '')) {
    return {
      isValid: false,
      reason: 'required'
    }
  }

  if (content.senderName?.value.length > SENDER_NAME_MAX_LENGTH || !textItemsWithinLimit) {
    return {
      isValid: false,
      reason: 'characterLimit'
    }
  }

  return { isValid: true }
}
