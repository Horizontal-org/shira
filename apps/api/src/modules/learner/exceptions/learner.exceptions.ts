import { HttpException, HttpStatus } from "@nestjs/common";

export class LearnerException extends HttpException {
  constructor(message: string, status: number, errorCode: string, details?: any) {
    super({ message, errorCode, details }, status);
  }
}

export class ConflictLearnerException extends LearnerException {
  constructor(id: string) {
    super("Learner already exists in this space", HttpStatus.CONFLICT, 'CONFLICT_LEARNER', { id });
  }
}

export class NotFoundLearnerException extends LearnerException {
  constructor() {
    super("Learner not found in this space", HttpStatus.NOT_FOUND, 'NOT_FOUND_LEARNER');
  }
}

export class SavingLearnerException extends LearnerException {
  constructor() {
    super("Failed to save learner", HttpStatus.INTERNAL_SERVER_ERROR, 'SAVING_LEARNER');
  }
}