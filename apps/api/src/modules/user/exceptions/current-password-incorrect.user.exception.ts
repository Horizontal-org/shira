import { HttpException, HttpStatus } from "@nestjs/common";
import { UserErrorCodes } from "./errors/user.error-codes";

export class CurrentPasswordIncorrectException extends HttpException {
  constructor() {
    const cause = "Current password is incorrect.";
    super(UserErrorCodes.CurrentPasswordIncorrect, HttpStatus.FORBIDDEN, { cause });
  }
}
