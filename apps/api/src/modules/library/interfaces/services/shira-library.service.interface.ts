export interface IShiraLibraryService {
  publishQuestion(data: Record<string, unknown>): Promise<void>
  publishQuiz(data: Record<string, unknown>): Promise<void>
  uploadImage(buffer: Buffer, filename: string): Promise<{ id: number; relativePath: string }>
}
