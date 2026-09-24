export class CreateNoteImageDto {
  file: Express.Multer.File
  quizId: number
  noteId?: number
}
