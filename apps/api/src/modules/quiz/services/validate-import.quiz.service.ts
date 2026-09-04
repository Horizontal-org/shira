import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import {
  InvalidQuestionMetadataException,
  InvalidZipStructureException,
} from 'src/modules/question/exceptions'
import {
  QuestionImportValidationResult,
  ValidateQuestionImportService,
} from 'src/modules/question/services/validateImport.question.service'
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
  ) {}

  async validate(buffer: Buffer): Promise<QuizImportValidationResult> {
    const entries = await this.validateQuestionImportService.loadZipEntries(buffer)

    const metadataEntry = entries.find((entry) => entry.entryName === METADATA_ENTRY)
    if (!metadataEntry) {
      throw new InvalidZipStructureException(`Zip must contain ${METADATA_ENTRY} at its root`)
    }

    const { title } = await this.parseMetadata(metadataEntry.getData())

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

    const sortedFolders = [...folderNames].sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10),
    )

    const questions: QuestionImportValidationResult[] = []
    for (const folder of sortedFolders) {
      questions.push(
        await this.validateQuestionImportService.validateEntries(entries, `questions/${folder}/`),
      )
    }

    return { title, questions }
  }

  private async parseMetadata(raw: Buffer): Promise<QuizImportMetadataDto> {
    let parsed: unknown
    try {
      parsed = JSON.parse(raw.toString('utf8'))
    } catch {
      throw new InvalidQuestionMetadataException('metadata.json is not valid JSON')
    }

    const metadata = plainToInstance(QuizImportMetadataDto, parsed)
    const errors = await validate(metadata)
    if (errors.length > 0) {
      throw new InvalidQuestionMetadataException(
        errors.map((error) => Object.values(error.constraints ?? {}).join(', ')).join('; '),
      )
    }

    return metadata
  }
}
