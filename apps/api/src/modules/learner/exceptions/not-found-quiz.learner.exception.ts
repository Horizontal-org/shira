import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundQuizException extends HttpException {
  constructor() {
    super("quiz_not_found", HttpStatus.NOT_FOUND,
      { cause: "Quiz to be assigned not found in this space" });
  }
}
