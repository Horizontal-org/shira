import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class QuizAssignmentFailedException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.AssignmentFailed, HttpStatus.BAD_REQUEST,
      { cause: "Failed to assign learner to quiz" });
  }
}