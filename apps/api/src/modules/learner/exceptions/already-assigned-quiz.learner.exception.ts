import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class QuizAssignmentAlreadyExistsException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.AlreadyAssignedToQuiz, HttpStatus.FORBIDDEN,
      { cause: "Learner is already assigned to this quiz" });
  }
}
