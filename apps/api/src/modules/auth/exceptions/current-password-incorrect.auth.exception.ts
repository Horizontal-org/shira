import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class CurrentPasswordIncorrectException extends HttpException {
  constructor() {
    const cause = "Current password is incorrect.";
    super(AuthErrorCodes.CurrentPasswordIncorrect, HttpStatus.FORBIDDEN, { cause });
  }
}
