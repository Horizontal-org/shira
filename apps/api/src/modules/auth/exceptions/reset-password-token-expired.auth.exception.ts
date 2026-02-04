import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordExpiredTokenException extends HttpException {
  constructor() {
    const cause = "Password reset token has expired.";
    super(AuthErrorCodes.ResetTokenExpired, HttpStatus.BAD_REQUEST, { cause });
  }
}
