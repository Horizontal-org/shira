import { BadRequestException } from "@nestjs/common";
import { BulkUploadErrorCode } from "./errors/learner-bulk.error-codes";

export class BulkUploadException extends BadRequestException {
  constructor(code: BulkUploadErrorCode, meta?: Record<string, any>) {
    super({ code, meta });
  }
}