import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class QuizAssignmentFailedException extends HttpException {
  constructor(quizId?: string, learnerId?: string) {
    const cause = quizId && learnerId ? `Failed to assign learner ${learnerId} to quiz ${quizId}`
      : "Failed to assign learner to quiz";
    super(LearnerErrorCodes.AssignmentFailed, HttpStatus.BAD_REQUEST, { cause });
  }
}