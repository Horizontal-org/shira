import { HttpException, HttpStatus } from "@nestjs/common";
import { UserErrorCodes } from "./errors/user.error-codes";

export class EmailTakenException extends HttpException {
  constructor() {
    const cause = "The email address is already taken.";
    super(UserErrorCodes.EmailAlreadyTaken, HttpStatus.CONFLICT, { cause });
  }
}
