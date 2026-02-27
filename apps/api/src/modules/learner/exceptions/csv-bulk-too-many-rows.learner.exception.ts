import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class TooManyRowsException extends HttpException {
  constructor(message?: string) {
    const cause = "Too many rows in CSV for bulk learner upload";
    super(LearnerBulkUploadErrorCode.TooManyRows, HttpStatus.BAD_REQUEST, { cause: message ?? cause });
  }
}