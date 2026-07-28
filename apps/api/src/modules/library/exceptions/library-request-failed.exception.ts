import { HttpException, HttpStatus } from '@nestjs/common'
import { LibraryErrorCodes } from './errors/library.error-codes'

export class LibraryRequestFailedException extends HttpException {
  constructor() {
    super(
      LibraryErrorCodes.LibraryRequestFailed,
      HttpStatus.SERVICE_UNAVAILABLE,
      { cause: 'Library request failed' },
    )
  }
}
