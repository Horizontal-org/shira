import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class NotConfirmedException extends HttpException {
  constructor(learnerId?: string) {
    const cause = learnerId ? `Learner ${learnerId} is pending confirmation`
      : "Learner is pending confirmation";
    super(LearnerErrorCodes.NotConfirmed, HttpStatus.FORBIDDEN, { cause });
  }
}