import { EntityManager } from "typeorm"

export interface DuplicateNoteImagesParams {
  originalNoteId: number
  content: string
  targetNoteId: number
  targetQuizId: number
  manager: EntityManager
}

export interface IDuplicateNoteImageService {
  // copies the note's images to the target note and returns the content with remapped data-image-id's
  execute(params: DuplicateNoteImagesParams): Promise<string>
}
