import { App } from "../../fetch/app"


export interface EmailContent {
  senderName?: string;
  senderEmail?: string;
  subject?: string;
  body?: string
}

export interface MessagingContent {
  senderName?: string;
  senderEmail?: string;
  subject?: string;
}


export interface QuestionToBe {
  name?: string
  isPhishing?: boolean
  app?: App
  content?: string
}