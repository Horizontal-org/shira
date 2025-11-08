import { ConflictException } from "@nestjs/common";

export class ConflictLearnerException extends ConflictException {
  constructor() {
    super("Learner already exists in this space");
  }
}