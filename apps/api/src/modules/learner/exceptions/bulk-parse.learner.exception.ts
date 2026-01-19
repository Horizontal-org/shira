import { BadRequestException } from "@nestjs/common";
import { BulkCsvParseErrorCode } from "./errors/learner-bulk.error-codes";

export class BulkParseException extends BadRequestException {
  constructor(code: BulkCsvParseErrorCode, meta?: Record<string, any>) {
    super({ code, meta });
  }
}