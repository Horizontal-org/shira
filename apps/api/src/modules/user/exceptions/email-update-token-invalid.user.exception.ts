import { HttpException, HttpStatus } from "@nestjs/common";
import { UserErrorCodes } from "./errors/user.error-codes";

export class EmailUpdateTokenInvalidException extends HttpException {
  constructor() {
    const cause = "The email update link is invalid or has expired.";
    super(UserErrorCodes.EmailUpdateTokenInvalid, HttpStatus.BAD_REQUEST, { cause });
  }
}
