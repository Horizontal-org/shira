export interface IShiraLibraryService {
  publishQuestion(data: Record<string, unknown>): Promise<void>
  publishQuiz(data: Record<string, unknown>): Promise<void>
}
