import { NotFoundException } from '@nestjs/common';

export class NotFoundLearnerException extends NotFoundException {
  constructor() {
    const message = "Learner not found in this space";
    super(message);
  }
}
