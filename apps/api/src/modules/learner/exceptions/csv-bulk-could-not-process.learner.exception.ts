import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class BulkCsvProcessingException extends HttpException {
  constructor(message?: string) {
    const cause = "Error processing CSV for bulk learner upload";
    super(LearnerBulkUploadErrorCode.InvalidFormatting, HttpStatus.BAD_REQUEST, { cause: message ?? cause });
  }
}
