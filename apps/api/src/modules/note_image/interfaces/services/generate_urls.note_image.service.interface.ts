import { ReadNoteImageDto } from "../../dto/read.note_image.dto"

export interface IGenerateUrlsNoteImageService {
  byQuiz(quizId: number): Promise<ReadNoteImageDto[]>
  byNote(noteId: number): Promise<ReadNoteImageDto[]>
}
