import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordEmailSendFailedException extends HttpException {
  constructor() {
    const cause = "Failed to enqueue password reset email.";
    super(AuthErrorCodes.ResetEmailSendFailed, HttpStatus.INTERNAL_SERVER_ERROR, { cause });
  }
}
