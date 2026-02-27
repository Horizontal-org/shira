import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerErrorCodes } from "./errors/learner.error-codes";

export class GenericErrorException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.ErrorMessage, HttpStatus.NOT_FOUND);
  }
}