import { HttpException, HttpStatus } from "@nestjs/common";
import { QuizResultErrorCodes } from "./errors/quiz-result.error-codes";

export class RecordUsageEnqueueQuizResultException extends HttpException {
  constructor(
    organizationId: string,
    error?: unknown,
  ) {
    const cause = error instanceof Error ? error.message : error;
    super(
      QuizResultErrorCodes.RecordUsageEnqueueFailed,
      HttpStatus.SERVICE_UNAVAILABLE,
      { cause: `Failed to enqueue payments usage for organizationId=${organizationId}: ${cause}` },
    );
  }
}
