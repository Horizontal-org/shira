import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerQuizErrorCodes } from "./errors/learner-quiz.error-codes";

export class AlreadyCompletedException extends HttpException {
  constructor() {
    super(LearnerQuizErrorCodes.QuizAlreadyCompleted, HttpStatus.FORBIDDEN,
      { cause: "Quiz is already completed by this learner" });
  }
}