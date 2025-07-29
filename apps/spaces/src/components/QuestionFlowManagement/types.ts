import { App } from "../../fetch/app"
import { AttachmentFile } from "../QuestionContent/components/Attachments";
import { MessagingDragItem } from "../QuestionContent/components/MessagingContent/interfaces/MessagingDragItem";

export interface EmailContent {
  senderName?: string;
  senderEmail?: string;
  subject?: string;
  body?: string
}

export interface MessagingContent {
  senderName?: string;
  senderPhone?: string;
  draggableItems?: Array<MessagingDragItem>
}

export interface QuestionToBe {
  name?: string
  isPhishing?: boolean
  app?: App
  content?: Object
  emailContent?: EmailContent
  messagingContent?: MessagingContent
  attachments?: AttachmentFile[]
}