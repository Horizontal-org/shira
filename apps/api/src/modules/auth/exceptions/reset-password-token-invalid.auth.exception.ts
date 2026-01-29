import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordTokenInvalidException extends HttpException {
  constructor() {
    const cause = "Password reset token is invalid.";
    super(AuthErrorCodes.ResetTokenInvalid, HttpStatus.NOT_FOUND, { cause });
  }
}
