import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class InvalidEmailUpdateException extends HttpException {
  constructor(currentEmail?: string, newEmail?: string) {
    const cause = currentEmail && newEmail
      ? `New email ${newEmail} cannot be the same as current email ${currentEmail}`
      : "The new email address is invalid.";
    super(AuthErrorCodes.InvalidEmailUpdate, HttpStatus.BAD_REQUEST, { cause });
  }
}
