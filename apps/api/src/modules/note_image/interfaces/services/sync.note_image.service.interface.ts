import { EntityManager } from "typeorm"
import { SyncNoteImageDto } from "../../dto/sync.note_image.dto"

export interface ISyncNoteImageService {
  execute(syncNoteImages: SyncNoteImageDto, manager?: EntityManager): Promise<void>
  deleteByNote(noteId: number): Promise<void>
}
