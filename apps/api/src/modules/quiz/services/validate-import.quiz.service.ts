import { Injectable } from '@nestjs/common'
import {
  InvalidQuestionMetadataException,
  InvalidZipStructureException,
} from 'src/modules/question/exceptions'
import {
  QuestionImportValidationResult,
  ValidateQuestionImportService,
} from 'src/modules/question/services/validateImport.question.service'
import { ZipImportService } from 'src/modules/question/services/zip-import.service'
import { QuizImportMetadataDto } from '../dto/quiz-import-metadata.dto'
import {
  NoteImportValidationResult,
  ValidateNoteImportService,
} from 'src/modules/note/services/validate-import.note.service'

const METADATA_ENTRY = 'metadata.json'
const QUESTION_FOLDER_PATTERN = /^questions\/([^/]+)\//
const NOTE_FOLDER_PATTERN = /^notes\/([^/]+)\//

export type QuizImportItem =
  | { entityType: 'question'; position: number; question: QuestionImportValidationResult }
  | { entityType: 'note'; position: number; note: NoteImportValidationResult }

export interface QuizImportValidationResult {
  title: string
  questions: QuestionImportValidationResult[]
  notes: NoteImportValidationResult[]
  items: QuizImportItem[]
}

@Injectable()
export class ValidateQuizImportService {
  constructor(
    private validateQuestionImportService: ValidateQuestionImportService,
    private zipImportService: ZipImportService,
    private validateNoteImportService: ValidateNoteImportService,
  ) { }

  async validate(buffer: Buffer): Promise<QuizImportValidationResult> {
    const entries = await this.zipImportService.loadZipEntries(buffer)

    const metadataEntry = entries.find((entry) => entry.entryName === METADATA_ENTRY)
    if (!metadataEntry) {
      throw new InvalidZipStructureException(`Zip must contain ${METADATA_ENTRY} at its root`)
    }

    const { title, questions: declaredQuestions, notes: declaredNotes = [] } = await this.zipImportService.parseAndValidateJson(
      metadataEntry.getData(),
      QuizImportMetadataDto,
    )

    const folderNames = new Set<string>()
    const noteFolderNames = new Set<string>()
    for (const entry of entries) {
      const match = entry.entryName.match(QUESTION_FOLDER_PATTERN)
      if (match) {
        folderNames.add(match[1])
      }
      const noteMatch = entry.entryName.match(NOTE_FOLDER_PATTERN)
      if (noteMatch) noteFolderNames.add(noteMatch[1])
    }

    if (folderNames.size === 0) {
      throw new InvalidZipStructureException('Zip must contain at least one question folder')
    }

    const sortedDeclaredQuestions = [...declaredQuestions].sort(
      (a, b) => a.position - b.position,
    )

    if (sortedDeclaredQuestions.length !== folderNames.size) {
      throw new InvalidQuestionMetadataException(
        `metadata.json declares ${sortedDeclaredQuestions.length} question(s) but the zip contains ${folderNames.size} question folder(s)`,
      )
    }

    if (declaredNotes.length !== noteFolderNames.size) {
      throw new InvalidQuestionMetadataException(
        `metadata.json declares ${declaredNotes.length} note(s) but the zip contains ${noteFolderNames.size} note folder(s)`,
      )
    }

    const questions: QuestionImportValidationResult[] = []
    const items: QuizImportItem[] = []
    for (const declaredQuestion of sortedDeclaredQuestions) {
      const folder = [...folderNames].find(
        (name) => name === `${declaredQuestion.position}` || name.startsWith(`${declaredQuestion.position}_`),
      )

      if (!folder) {
        throw new InvalidQuestionMetadataException(
          `metadata.json declares a question at position ${declaredQuestion.position} with no matching questions/ folder`,
        )
      }

      const question = await this.validateQuestionImportService.validateEntries(entries, `questions/${folder}/`)
      questions.push(question)
      items.push({ entityType: 'question', position: declaredQuestion.position, question })
    }

    const notes: NoteImportValidationResult[] = []
    for (const declaredNote of [...declaredNotes].sort((a, b) => a.position - b.position)) {
      const folder = [...noteFolderNames].find(
        (name) => name === `${declaredNote.position}` || name.startsWith(`${declaredNote.position}_`),
      )
      if (!folder) {
        throw new InvalidQuestionMetadataException(
          `metadata.json declares a note at position ${declaredNote.position} with no matching notes/ folder`,
        )
      }
      const note = this.validateNoteImportService.validateEntries(
        entries,
        `notes/${folder}/`,
        declaredNote,
      )
      notes.push(note)
      items.push({ entityType: 'note', position: declaredNote.position, note })
    }

    const positions = items.map((item) => item.position)
    if (new Set(positions).size !== positions.length) {
      throw new InvalidQuestionMetadataException('Quiz item positions must be unique')
    }

    return { title, questions, notes, items: items.sort((a, b) => a.position - b.position) }
  }
}
