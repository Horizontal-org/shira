import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class BulkCsvFileTooLargeException extends HttpException {
  constructor(message?: string) {
    const cause = "CSV file too large for bulk learner upload";
    super(LearnerBulkUploadErrorCode.FileTooLarge, HttpStatus.PAYLOAD_TOO_LARGE, {
      cause: message ?? cause,
    });
  }
}
