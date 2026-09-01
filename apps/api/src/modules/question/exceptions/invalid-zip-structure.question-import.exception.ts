import { HttpException, HttpStatus } from '@nestjs/common'
import { QuestionImportErrorCode } from './errors/question-import.error-codes'

export class InvalidZipStructureException extends HttpException {
  constructor(message?: string) {
    const cause = 'Zip file does not have a valid question export structure'
    super(QuestionImportErrorCode.InvalidZipFile, HttpStatus.BAD_REQUEST, {
      cause: message ?? cause,
    })
  }
}
