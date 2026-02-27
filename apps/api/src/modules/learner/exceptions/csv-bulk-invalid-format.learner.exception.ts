import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class InvalidFileFormatException extends HttpException {
  constructor(message?: string) {
    const cause = "Invalid CSV for bulk learner upload";
    super(LearnerBulkUploadErrorCode.InvalidFileFormat, HttpStatus.BAD_REQUEST, { cause: message ?? cause });
  }
}