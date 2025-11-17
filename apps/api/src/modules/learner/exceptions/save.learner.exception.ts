import { HttpException, HttpStatus } from '@nestjs/common';

export class SavingLearnerException extends HttpException {
  constructor() {
    super("learner_save_failed", HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: "An error occurred while saving the learner" });
  }
}