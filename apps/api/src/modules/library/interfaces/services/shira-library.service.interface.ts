import { PublishAuthorDto } from '../../dto/publish-question.library.dto'
import { CreateTemplateQuizQuestionDto } from '../../dto/create-template-quiz.library.dto'

export interface LibraryQuizTemplate {
  title: string
  questions: CreateTemplateQuizQuestionDto[]
}

export interface IShiraLibraryService {
  registerAuthor(author: PublishAuthorDto): Promise<{ apiKey: string }>
  publishQuestion(data: Record<string, unknown>, apiKey: string): Promise<void>
  publishQuiz(data: Record<string, unknown>, apiKey: string): Promise<void>
  uploadImage(buffer: Buffer, filename: string, apiKey: string): Promise<{ id: number; relativePath: string }>
  getQuizTemplate(quizTemplateId: string): Promise<LibraryQuizTemplate>
}
