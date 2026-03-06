import { HttpException, HttpStatus } from "@nestjs/common";
import { UserErrorCodes } from "./errors/user.error-codes";

export class UserNotFoundException extends HttpException {
  constructor(email?: string) {
    const cause = email
      ? `User with email ${email} not found`
      : "The user was not found.";
    super(UserErrorCodes.UserNotFound, HttpStatus.NOT_FOUND, { cause });
  }
}
