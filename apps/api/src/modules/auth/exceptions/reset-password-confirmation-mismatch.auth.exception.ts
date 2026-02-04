import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordConfirmationMismatchException extends HttpException {
  constructor() {
    const cause = "Password confirmation does not match.";
    super(AuthErrorCodes.ResetPasswordConfirmationMismatch, HttpStatus.BAD_REQUEST, { cause });
  }
}
