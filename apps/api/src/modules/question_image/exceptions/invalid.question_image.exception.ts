import { HttpException, HttpStatus } from '@nestjs/common';
import { QuestionImageErrorCodes } from './errors/question_image.error-codes';

export class FileInvalidException extends HttpException {
  constructor() {
    const cause = `Invalid file type`;
    super(QuestionImageErrorCodes.FileInvalid, HttpStatus.BAD_REQUEST, { cause });
  }
}
