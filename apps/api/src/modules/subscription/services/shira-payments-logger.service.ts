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
      `${this.buildBaseMessage(context)} started`,
    );
  }

  succeeded(
    context: ShiraPaymentsLogContext,
    status: number,
    durationMs: number,
  ) {
    this.logger.log(
      `${this.buildBaseMessage(context)} succeeded status=${status} durationMs=${durationMs}`,
    );
  }

  failed(
    context: ShiraPaymentsLogContext,
    status: number,
    durationMs: number,
    message: string,
  ) {
    this.logger.error(
      `${this.buildBaseMessage(context)} failed status=${status} durationMs=${durationMs} message=${message}`,
    );
  }

  requestError(
    context: ShiraPaymentsLogContext,
    durationMs: number,
    message: string,
    stack?: string,
  ) {
    this.logger.error(
      `${this.buildBaseMessage(context)} error durationMs=${durationMs} message=${message}`,
      stack,
    );
  }

  private buildBaseMessage(context: Partial<ShiraPaymentsLogContext>) {
    const parts = [
      "ShiraPaymentsRequest",
      context.requestId ? `requestId=${context.requestId}` : undefined,
      context.organizationId
        ? `organizationId=${context.organizationId}`
        : undefined,
      context.method ? `method=${context.method}` : undefined,
      context.url ? `url=${context.url}` : undefined,
    ];

    return parts.filter(Boolean).join(" ");
  }
}
