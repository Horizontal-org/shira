import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordTokenUsedException extends HttpException {
  constructor() {
    const cause = "Password reset token has already been used.";
    super(AuthErrorCodes.ResetTokenUsed, HttpStatus.NOT_FOUND, { cause });
  }
}
