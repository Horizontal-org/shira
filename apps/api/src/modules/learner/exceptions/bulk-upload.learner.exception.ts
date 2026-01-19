import { BadRequestException } from "@nestjs/common";
import { LearnerBulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class BulkUploadException extends BadRequestException {
  constructor(code: LearnerBulkUploadErrorCode, meta?: Record<string, any>) {
    super({ code, meta });
  }
}