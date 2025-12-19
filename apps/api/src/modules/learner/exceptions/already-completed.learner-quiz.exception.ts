import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerQuizErrorCodes } from "./errors/learner-quiz.error-codes";

export class AlreadyCompletedException extends HttpException {
  constructor(quizId?: string, learnerId?: string) {
    const cause = quizId && learnerId ? `Quiz ${quizId} is already completed by learner ${learnerId}`
      : "Quiz is already completed by this learner";
    super(LearnerQuizErrorCodes.QuizAlreadyCompleted, HttpStatus.FORBIDDEN, { cause });
  }
}