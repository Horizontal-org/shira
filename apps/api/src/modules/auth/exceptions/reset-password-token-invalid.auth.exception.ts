import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordTokenInvalidException extends HttpException {
  constructor() {
    const cause = "Invalid or expired reset link.";
    super(AuthErrorCodes.ResetTokenInvalid, HttpStatus.BAD_REQUEST, { cause });
  }
}
