import { HttpException, HttpStatus } from '@nestjs/common';
import { QuizErrorCodes } from './errors/quiz.error-codes';

export class PublicLibraryDisabledException extends HttpException {
  constructor() {
    super(
      QuizErrorCodes.PublicLibraryDisabled,
      HttpStatus.FORBIDDEN,
      { cause: `Public library is disabled on this instance` },
    );
  }
}
