import { HttpException, HttpStatus } from "@nestjs/common";

export class ConflictLearnerException extends HttpException {
  constructor() {
    super("learner_already_exists", HttpStatus.CONFLICT,
      { cause: "Learner already exists in this space" });
  }
}