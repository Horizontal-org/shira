import { Injectable } from "@nestjs/common";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { IShiraPaymentsLoggerService } from "../interfaces/services/shira-payments-logger.service.interface";

type ShiraPaymentsLogContext = {
  requestId: string;
  organizationId?: string;
  method: string;
  url?: string;
};

@Injectable()
export class ShiraPaymentsLoggerService implements IShiraPaymentsLoggerService {
  private readonly logger = new ApiLogger(ShiraPaymentsLoggerService.name);

  started(context: ShiraPaymentsLogContext) {
    this.logger.log({
      name: 'ShiraPaymentsRequest',
      event: 'started',
      ...this.buildBaseContext(context),
    });
  }

  succeeded(
    context: ShiraPaymentsLogContext,
    status: number,
    durationMs: number,
  ) {
    this.logger.log({
      name: 'ShiraPaymentsRequest',
      event: 'succeeded',
      ...this.buildBaseContext(context),
      status,
      duration_ms: durationMs,
    });
  }

  failed(
    context: ShiraPaymentsLogContext,
    status: number,
    durationMs: number,
    message: string,
  ) {
    this.logger.error({
      name: 'ShiraPaymentsRequest',
      event: 'failed',
      ...this.buildBaseContext(context),
      status,
      duration_ms: durationMs,
      message,
    });
  }

  requestError(
    context: ShiraPaymentsLogContext,
    durationMs: number,
    message: string,
    stack?: string,
  ) {
    this.logger.error(
      {
        name: 'ShiraPaymentsRequest',
        event: 'error',
        ...this.buildBaseContext(context),
        duration_ms: durationMs,
        message,
      },
      stack,
    );
  }

  private buildBaseContext(context: Partial<ShiraPaymentsLogContext>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    if (context.requestId) result.requestId = context.requestId;
    if (context.organizationId) result.organizationId = context.organizationId;
    if (context.method) result.method = context.method;
    if (context.url) result.url = context.url;
    return result;
  }
}
