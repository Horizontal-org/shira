import { ConflictException } from "@nestjs/common";

export class TokenConflictLearnerException extends ConflictException {
  constructor() {
    super("Token from learner is invalid or has already been used");
  }
}