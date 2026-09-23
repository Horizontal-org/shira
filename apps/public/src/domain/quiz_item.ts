import { Question } from "./question";

export interface NoteType {
  content: string;
  id: string;
}

export interface QuizItem {
  entityType: string;
  position: number;
  question?: Question
  note?: NoteType
}
