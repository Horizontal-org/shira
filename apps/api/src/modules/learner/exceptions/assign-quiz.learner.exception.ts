import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class AssignToQuizException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.AssignmentFailed, HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: "Failed to assign learner to quiz" });
  }
}