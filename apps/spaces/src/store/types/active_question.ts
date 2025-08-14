import { App } from "../../fetch/app";
import { Explanation } from "./explanation";

export const defaultEmailContent: EmailContent = {
  senderEmail: {
    value: '',
    explanation: null,
    htmlId: 'component-required-sender-email',
    contentType: 'text'
  },
  senderName: {
    value: '',
    explanation: null,
    htmlId: 'component-required-sender-name',
    contentType: 'text'
  },
  subject: {
    value: '',
    explanation: null,
    htmlId: 'component-optional-subject',
    contentType: 'text'
  },
  body: {
    value: '',
    htmlId: 'component-text-1',
    contentType: 'editor'
  },
  draggableItems: []
}

export const defaultMessageContent: MessagingContent = {
  senderPhone: {
    value: '',
    explanation: null,
    htmlId: 'component-required-phone',
    contentType: 'text'
  },
  senderName: {
    value: '',
    explanation: null,
    htmlId: 'component-required-fullname',
    contentType: 'text'
  },
  draggableItems: []
}


export interface ActiveQuestion {
  name: string;
  isPhishing?: boolean
  app?: App
  content: EmailContent | MessagingContent  
}

export interface EmailContent {
  senderName?: QuestionTextInput;
  senderEmail?: QuestionTextInput;
  subject?: QuestionTextInput;
  body?: QuestionEditorInput
  draggableItems?: Array<any>
}

export interface MessagingContent {
  senderName?: QuestionTextInput;
  senderPhone?: QuestionTextInput;
  draggableItems?: Array<QuestionDragEditor | QuestionDragImage>
}

export interface QuestionTextInput {
  value: string;
  htmlId: string;
  explanation: string | null
  contentType: 'text'
}

export interface QuestionEditorInput {
  value: string
  htmlId: string;
  contentType: 'editor'
}

//drag items
export interface QuestionDragEditor extends QuestionEditorInput {
  draggableId: string;
  position: number;
}

export interface QuestionDragImage {
  value: ImageObject
  htmlId: string;
  contentType: 'image',
  draggableId: string;
  position: number;
  explanation: string | null
}

export interface ImageObject {
  url: string;
  id: string;
  originalFilename: string;
}
