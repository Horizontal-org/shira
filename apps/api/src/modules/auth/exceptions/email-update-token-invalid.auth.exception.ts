import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class EmailUpdateTokenInvalidException extends HttpException {
  constructor() {
    const cause = "The email update link is invalid or has expired.";
    super(AuthErrorCodes.EmailUpdateTokenInvalid, HttpStatus.BAD_REQUEST, { cause });
  }
}
