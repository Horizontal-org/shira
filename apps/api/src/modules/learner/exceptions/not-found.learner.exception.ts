import { NotFoundException } from '@nestjs/common';

export class NotFoundLearnerException extends NotFoundException {
  constructor() {
    super("Learner not found in this space");
  }
}
