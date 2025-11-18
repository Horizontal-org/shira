import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class EmailSendFailedException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.EmailSendFailed, HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: "Failed to send email invitation to learner" });
  }
}