import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class InvitationExpiredException extends HttpException {
  constructor() {
    const cause = 'Invitation token has expired';
    super(LearnerErrorCodes.TokenExpired, HttpStatus.UNAUTHORIZED, { cause });
  }
}