import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class UserNotFoundException extends HttpException {
  constructor(email?: string) {
    const cause = email
      ? `User with email ${email} not found`
      : "The user was not found.";
    super(AuthErrorCodes.UserNotFound, HttpStatus.NOT_FOUND, { cause });
  }
}
