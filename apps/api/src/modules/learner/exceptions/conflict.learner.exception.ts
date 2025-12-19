import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class ConflictLearnerException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.AlreadyExists, HttpStatus.CONFLICT,
      { cause: "Learner already exists in this space" });
  }
}