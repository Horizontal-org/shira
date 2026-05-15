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
    this.logger.log(
      { requestId: context.requestId, organizationId: context.organizationId, method: context.method, url: context.url },
      'payments request started',
    );
  }

  succeeded(context: ShiraPaymentsLogContext, status: number, durationMs: number) {
    this.logger.log(
      { requestId: context.requestId, organizationId: context.organizationId, method: context.method, url: context.url, status, durationMs },
      'payments request succeeded',
    );
  }

  failed(context: ShiraPaymentsLogContext, status: number, durationMs: number, message: string) {
    this.logger.error(
      { requestId: context.requestId, organizationId: context.organizationId, method: context.method, url: context.url, status, durationMs, message },
    );
  }

  requestError(context: ShiraPaymentsLogContext, durationMs: number, message: string, stack?: string) {
    this.logger.error(
      { requestId: context.requestId, organizationId: context.organizationId, method: context.method, url: context.url, durationMs, message },
      stack,
    );
  }
}
