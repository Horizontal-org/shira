import { HttpException, HttpStatus } from '@nestjs/common'

export class LibraryPublishFailedException extends HttpException {
  constructor(errorBody?: string) {
    super(
      {
        message: 'Failed to publish question to library',
        error: errorBody,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: errorBody ?? 'Library publish request failed' },
    )
  }
}
