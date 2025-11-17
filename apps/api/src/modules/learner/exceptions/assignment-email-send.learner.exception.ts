import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class AssignmentEmailSendFailedException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.EmailSendFailed, HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: "Failed to send quiz assignment email to learner" });
  }
}