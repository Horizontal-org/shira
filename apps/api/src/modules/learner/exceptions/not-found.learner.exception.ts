import { HttpException, HttpStatus } from '@nestjs/common';
import { LearnerErrorCodes } from './errors/learner.error-codes';

export class NotFoundLearnerException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.NotFound, HttpStatus.NOT_FOUND,
      { cause: "Learner not found in this space" });
  }
}
