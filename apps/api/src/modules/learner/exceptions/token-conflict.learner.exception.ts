import { HttpException, HttpStatus } from '@nestjs/common';
import { LearnerErrorCodes } from './errors/learner.error-codes';

export class TokenConflictLearnerException extends HttpException {
  constructor() {
    super(LearnerErrorCodes.TokenConflict, HttpStatus.CONFLICT,
      { cause: "Token from learner is invalid or has already been used" });
  }
}