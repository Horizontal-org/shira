import { HttpException, HttpStatus } from '@nestjs/common'
import { QuestionImportErrorCode } from './errors/question-import.error-codes'

export class QuestionImportFileTooLargeException extends HttpException {
  constructor(message?: string) {
    const cause = 'Zip file exceeds the 50MB import limit'
    super(QuestionImportErrorCode.FileTooLarge, HttpStatus.PAYLOAD_TOO_LARGE, {
      cause: message ?? cause,
    })
  }
}
