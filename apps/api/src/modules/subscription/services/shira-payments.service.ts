import {
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import { IShiraPaymentsService } from "../interfaces/services/shira-payments.service.interface";
import { IShiraPaymentsLoggerService } from "../interfaces/services/shira-payments-logger.service.interface";
import { TYPES } from "../interfaces";

@Injectable()
export class ShiraPaymentsService implements IShiraPaymentsService {
  constructor(
    @Inject(TYPES.services.IShiraPaymentsLoggerService)
    private readonly logger: IShiraPaymentsLoggerService,
  ) { }

  async createCheckout(organizationId: string) {
    return this.request<{ url: string }>('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify({ organizationId }),
    }, organizationId);
  }

  async manageSubscription(organizationId: string) {
    return this.request<{ url: string }>(`/subscriptions/manage/${organizationId}`, {
      method: 'POST',
    }, organizationId);
  }

  async getSubscription(organizationId: string) {
    return this.request<{ subscription: Record<string, unknown> }>(
      `/subscriptions/${organizationId}`,
      { method: 'GET' },
      organizationId,
    );
  }

  private async request<T>(
    path: string,
    init?: RequestInit,
    organizationId?: string,
  ): Promise<T> {
    const baseUrl = process.env.SHIRA_PAYMENTS_URL;
    const apiKey = process.env.INTERNAL_SHIRA_API_KEY;
    const trimmedBaseUrl = baseUrl?.trim() ?? '';
    const method = init?.method ?? 'GET';
    const requestId = randomUUID();

    const url = new URL(path, trimmedBaseUrl.endsWith('/') ? trimmedBaseUrl : `${trimmedBaseUrl}/`);
    const startedAt = Date.now();
    const logContext = {
      requestId,
      organizationId,
      method,
      url: url.toString(),
    };

    this.logger.started(logContext);

    const response = await fetch(url, {
      ...init,
      headers: {
        'content-type': 'application/json',
        'x-request-id': requestId,
        'x-internal-shira-key': apiKey,
        ...(init?.headers ?? {}),
      },
    });

    const duration = Date.now() - startedAt;

    if (!response.ok) {
      const message = await response.text();
      this.logger.failed(logContext, response.status, duration, message);
      throw new Error(message);
    }

    this.logger.succeeded(logContext, response.status, duration);

    return response.json();
  }
}
