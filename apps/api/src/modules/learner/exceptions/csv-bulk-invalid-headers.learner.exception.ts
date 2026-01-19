import { HttpException, HttpStatus } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class InvalidHeadersException extends HttpException {
  constructor(message?: string) {
    const cause = "Invalid headers in CSV for bulk learner upload";
    super(LearnerBulkUploadErrorCode.InvalidHeaders, HttpStatus.BAD_REQUEST, { cause: message ?? cause });
  }
}