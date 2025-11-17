import { HttpException, HttpStatus } from '@nestjs/common';
import { LearnerErrorCodes } from './errors/learner.error-codes';

export class SavingLearnerException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.SaveFailed, HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: "An error occurred while saving the learner" });
  }
}