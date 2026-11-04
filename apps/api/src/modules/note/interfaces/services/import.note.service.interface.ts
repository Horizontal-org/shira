import { EntityManager } from 'typeorm'
import { Note } from '../../domain'
import { NoteImportValidationResult } from './validate-import.note.service.interface'

export interface IImportNoteService {
  execute(
    manager: EntityManager,
    quizId: number,
    position: number,
    importedNote: NoteImportValidationResult,
  ): Promise<Note>
}
