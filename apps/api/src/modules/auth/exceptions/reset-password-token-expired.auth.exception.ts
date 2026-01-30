import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordTokenExpiredException extends HttpException {
  constructor() {
    const cause = "Password reset token has expired.";
    super(AuthErrorCodes.ResetTokenExpired, HttpStatus.UNAUTHORIZED, { cause });
  }
}
