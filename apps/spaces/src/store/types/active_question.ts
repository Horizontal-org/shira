import { App } from "../../fetch/app";
import { Explanation } from "./explanation";



export const defaultEmailContent: EmailContent = {
  senderEmail: {
    value: '',
    explanation: null
  },
  senderName: {
    value: '',
    explanation: null
  },
  subject: {
    value: '',
    explanation: null
  },
  body: {
    value: '',
    explanations: []
  },
  // draggableItems: []
}

export const defaultMessageContent: MessagingContent = {
  senderPhone: {
    value: '',
    explanation: null
  },
  senderName: {
    value: '',
    explanation: null
  },
  // draggableItems: []
}

export interface QuestionTextInput {
  value: string;
  explanation: Explanation | null
}

export interface QuestionEditorInput {
  value: string
  explanations: Explanation[]
}

export interface EmailContent {
  senderName?: QuestionTextInput;
  senderEmail?: QuestionTextInput;
  subject?: QuestionTextInput;
  body?: QuestionEditorInput
  // draggableItems?: Array<AttachmenDragItem>
}

export interface MessagingContent {
  senderName?: QuestionTextInput;
  senderPhone?: QuestionTextInput;
  // draggableItems?: Array<MessagingDragItem>
}

export interface ActiveQuestion {
  name: string;
  isPhishing?: boolean
  app?: App
  content: EmailContent | MessagingContent  
}

