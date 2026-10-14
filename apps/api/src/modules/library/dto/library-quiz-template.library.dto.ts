import { CreateTemplateQuizQuestionDto } from './create-template-quiz.library.dto'

export interface LibraryQuizTemplate {
  title: string
  questions: CreateTemplateQuizQuestionDto[]
}
