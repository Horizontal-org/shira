import { DuplicateNoteDto } from "../../dto/duplicate.note.dto"

export interface IDuplicateNoteService {
  execute(duplicateDto: DuplicateNoteDto): Promise<void>
}
