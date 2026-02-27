import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class EmailNoMatchAuthException extends HttpException {
  constructor() {
    const cause = "The email address does not match the email invitation."
    super(AuthErrorCodes.EmailNoMatch, HttpStatus.FORBIDDEN, { cause });
  }
}