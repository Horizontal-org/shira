import { ActiveNote } from "../../types/active_note"
import { EMAIL_CONTENT_MAX_LENGTH, QUESTION_NAME_MAX_LENGTH } from "../inputLimits"
import { hasRequiredValue } from "../validation"

type NoteStepValidationReason = 'required' | 'characterLimit'

export interface NoteStepValidationResult {
  isValid: boolean
  reason?: NoteStepValidationReason
}

export const isNoteInfoStepValid = (note?: ActiveNote): NoteStepValidationResult => {
  if (!hasRequiredValue(note?.name ?? '')) {
    return { isValid: false, reason: 'required' }
  }

  const body = new DOMParser().parseFromString(note.content?.value ?? '', 'text/html').body
  const text = body.textContent ?? ''
  // a note with only images is still a valid note
  const hasContent = text.trim().length > 0 || body.querySelector('img') !== null

  if (!hasContent) {
    return { isValid: false, reason: 'required' }
  }

  if (note.name.length > QUESTION_NAME_MAX_LENGTH || text.length > EMAIL_CONTENT_MAX_LENGTH) {
    return { isValid: false, reason: 'characterLimit' }
  }

  return { isValid: true }
}
