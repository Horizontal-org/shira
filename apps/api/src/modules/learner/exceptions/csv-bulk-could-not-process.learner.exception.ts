import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class CouldNotProcessCsvException extends HttpException {
  constructor(message?: string) {
    const cause = "Error processing CSV for bulk learner upload";
    super(LearnerBulkUploadErrorCode.CouldNotProcess, HttpStatus.INTERNAL_SERVER_ERROR, { cause: message ?? cause });
  }
}