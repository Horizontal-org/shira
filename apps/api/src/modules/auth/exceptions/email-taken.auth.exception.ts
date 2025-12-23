import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/learner-quiz.error-codes";

export class EmailTakenException extends HttpException {
  constructor() {
    const cause = "The email address is already taken."
    super(AuthErrorCodes.EmailAlreadyTaken, HttpStatus.FORBIDDEN, { cause });
  }
}