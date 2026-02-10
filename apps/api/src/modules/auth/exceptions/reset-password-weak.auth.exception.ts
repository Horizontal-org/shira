import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class ResetPasswordWeakException extends HttpException {
  constructor() {
    const cause = "Password does not meet minimum requirements.";
    super(AuthErrorCodes.ResetPasswordWeak, HttpStatus.BAD_REQUEST, { cause });
  }
}
