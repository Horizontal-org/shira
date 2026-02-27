import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthErrorCodes } from "./errors/auth.error-codes";

export class GenericAuthErrorException extends HttpException {
  constructor() {
    super(AuthErrorCodes.ErrorMessage, HttpStatus.NOT_FOUND);
  }
}