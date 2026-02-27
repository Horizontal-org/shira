import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class CSVParsingException extends HttpException {
  constructor(message?: string) {
    const cause = "Error parsing CSV for bulk learner upload";
    super(LearnerBulkUploadErrorCode.CSVParsingError, HttpStatus.BAD_REQUEST, { cause: message ?? cause });
  }
}