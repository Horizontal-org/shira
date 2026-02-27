import { HttpException, HttpStatus } from '@nestjs/common';
import { LearnerErrorCodes } from './errors/learner.error-codes';

export class SavingLearnerException extends HttpException {
  constructor(email?: string) {
    const cause = email ? `An error occurred while saving the learner with email: ${email}`
      : "An error occurred while saving the learner";
    super(LearnerErrorCodes.SaveFailed, HttpStatus.INTERNAL_SERVER_ERROR, { cause });
  }
}