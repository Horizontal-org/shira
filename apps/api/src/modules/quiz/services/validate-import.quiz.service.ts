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

const METADATA_ENTRY = 'metadata.json'
const QUESTION_FOLDER_PATTERN = /^questions\/([^/]+)\//

export interface QuizImportValidationResult {
  title: string
  questions: QuestionImportValidationResult[]
}

@Injectable()
export class ValidateQuizImportService {
  constructor(
    private validateQuestionImportService: ValidateQuestionImportService,
    private zipImportService: ZipImportService,
  ) { }

  async validate(buffer: Buffer): Promise<QuizImportValidationResult> {
    const entries = await this.zipImportService.loadZipEntries(buffer)

    const metadataEntry = entries.find((entry) => entry.entryName === METADATA_ENTRY)
    if (!metadataEntry) {
      throw new InvalidZipStructureException(`Zip must contain ${METADATA_ENTRY} at its root`)
    }

    const { title, questions: declaredQuestions } = await this.zipImportService.parseAndValidateJson(
      metadataEntry.getData(),
      QuizImportMetadataDto,
    )

    const folderNames = new Set<string>()
    for (const entry of entries) {
      const match = entry.entryName.match(QUESTION_FOLDER_PATTERN)
      if (match) {
        folderNames.add(match[1])
      }
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

    const questions: QuestionImportValidationResult[] = []
    for (const declaredQuestion of sortedDeclaredQuestions) {
      const folder = [...folderNames].find(
        (name) => name === `${declaredQuestion.position}` || name.startsWith(`${declaredQuestion.position}_`),
      )

      if (!folder) {
        throw new InvalidQuestionMetadataException(
          `metadata.json declares a question at position ${declaredQuestion.position} with no matching questions/ folder`,
        )
      }

      questions.push(
        await this.validateQuestionImportService.validateEntries(entries, `questions/${folder}/`),
      )
    }

    return { title, questions }
  }
}
