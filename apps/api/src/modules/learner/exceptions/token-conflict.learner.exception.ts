import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenConflictLearnerException extends HttpException {
  constructor() {
    super("learner_token_conflict", HttpStatus.CONFLICT,
      { cause: "Token from learner is invalid or has already been used" });
  }
}