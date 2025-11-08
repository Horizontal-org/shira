import { InternalServerErrorException } from "@nestjs/common";

export class SavingLearnerException extends InternalServerErrorException {
  constructor() {
    super("Failed to save learner");
  }
}