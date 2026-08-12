import { PublishAuthorDto } from '../../dto/publish-question.library.dto'

export interface IShiraLibraryService {
  registerAuthor(author: PublishAuthorDto): Promise<{ apiKey: string }>
  publishQuestion(data: Record<string, unknown>, apiKey: string): Promise<void>
  publishQuiz(data: Record<string, unknown>, apiKey: string): Promise<void>
  uploadImage(buffer: Buffer, filename: string, apiKey: string): Promise<{ id: number; relativePath: string }>
}
