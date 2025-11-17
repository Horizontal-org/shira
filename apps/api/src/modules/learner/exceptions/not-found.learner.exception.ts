import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundLearnerException extends HttpException {
  constructor() {
    super("learner_not_found", HttpStatus.NOT_FOUND,
      { cause: "Learner not found in this space" });
  }
}
