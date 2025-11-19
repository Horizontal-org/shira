import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class NotConfirmedException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.NotConfirmed, HttpStatus.FORBIDDEN,
      { cause: "Learner is pending confirmation" });
  }
}