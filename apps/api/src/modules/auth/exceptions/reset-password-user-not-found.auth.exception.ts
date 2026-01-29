import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordUserNotFoundException extends HttpException {
  constructor() {
    const cause = "User not found for password reset token.";
    super(AuthErrorCodes.ResetUserNotFound, HttpStatus.NOT_FOUND, { cause });
  }
}
