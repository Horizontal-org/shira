import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class QuizUnassignmentFailedException extends HttpException {
  constructor(quizId?: string) {
    const cause = quizId ? `Failed to unassign learner to quiz ${quizId}`
      : "Failed to unassign learner to quiz";
    super(LearnerErrorCodes.UnassignmentFailed, HttpStatus.BAD_REQUEST, { cause });
  }
}