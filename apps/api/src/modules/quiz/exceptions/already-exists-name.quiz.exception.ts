import { HttpException, HttpStatus } from '@nestjs/common';
import { QuizErrorCodes } from './errors/quiz.error-codes';

export class AlreadyExistsQuizNameException extends HttpException {
  constructor(quizTitle: string) {
    const cause = `Quiz ${quizTitle} already exists in the space`;
    super(QuizErrorCodes.QuizNameAlreadyExists, HttpStatus.CONFLICT, { cause });
  }
}
