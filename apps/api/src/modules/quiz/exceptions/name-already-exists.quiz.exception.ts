import { HttpException, HttpStatus } from "@nestjs/common";
import { QuizErrorCodes } from "./errors/learner.error-codes";

export class NameAlreadyExistsException extends HttpException {
  constructor(quizName: string) {
    const cause = `Quiz with title ${quizName} already exists`;
    super(QuizErrorCodes.QuizTitleAlreadyExists, HttpStatus.BAD_REQUEST, { cause });
  }
}