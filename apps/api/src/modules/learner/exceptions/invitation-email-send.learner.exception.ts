import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class InvitationEmailSendFailedException extends HttpException {
  constructor(email?: string) {
    const cause = email ? `Failed to send invitation email to learner with email: ${email}`
      : "Failed to send invitation email to learner";
    super(LearnerErrorCodes.EmailSendFailed, HttpStatus.INTERNAL_SERVER_ERROR, { cause });
  }
}