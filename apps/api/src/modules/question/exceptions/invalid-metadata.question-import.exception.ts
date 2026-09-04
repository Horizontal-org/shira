import { HttpException, HttpStatus } from '@nestjs/common'
import { QuestionImportErrorCode } from './errors/question-import.error-codes'

export class InvalidQuestionMetadataException extends HttpException {
  constructor(message?: string) {
    const cause = 'metadata.json is missing or does not match the expected shape'
    super(QuestionImportErrorCode.InvalidMetadata, HttpStatus.BAD_REQUEST, {
      cause: message ?? cause,
    })
  }
}
