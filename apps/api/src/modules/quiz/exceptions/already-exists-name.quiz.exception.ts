import { ConflictException } from '@nestjs/common';

export class AlreadyExistsQuizNameException extends ConflictException {
  constructor(quizTitle: string) {
    const message = `Quiz ${quizTitle} already exists in the space`;
    super(message);
  }
}
