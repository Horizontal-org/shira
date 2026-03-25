import {
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ApiLogger } from "src/utils/logger/api-logger.service";

@Injectable()
export class ShiraPaymentsService {

  private readonly logger = new ApiLogger(ShiraPaymentsService.name);

  async createCheckout(dto: { organizationId: string; priceId?: string }) {
    this.logger.log(`Creating checkout for organization: ${dto.organizationId}`);
    return this.request<{ url: string }>('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }
  async cancelSubscription(organizationId: string) {
    this.logger.log(`Cancelling subscription for organization: ${organizationId}`);
    return this.request<{ success: boolean }>(`/subscriptions/${organizationId}`, {
      method: 'DELETE',
    });
  }
  async manageSubscription(organizationId: string) {
    this.logger.log(`Managing subscription for organization: ${organizationId}`);
    return this.request<{ url: string }>(`/subscriptions/manage/${organizationId}`, {
      method: 'POST',
    });
  }

  async getSubscription(organizationId: string) {
    this.logger.log(`Getting subscription for organization: ${organizationId}`);
    return this.request<{ subscription: Record<string, unknown> }>(
      `/subscriptions/${organizationId}`,
    );
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const baseUrl = process.env.SHIRA_PAYMENTS_URL;
    const apiKey = process.env.SHIRA_PAYMENTS_INTERNAL_KEY;
    const trimmedBaseUrl = baseUrl?.trim();

    const url = new URL(path, trimmedBaseUrl.endsWith('/') ? trimmedBaseUrl : `${trimmedBaseUrl}/`);

    const response = await fetch(url, {
      ...init,
      headers: {
        'content-type': 'application/json',
        'x-internal-shira-key': apiKey,
        ...(init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new InternalServerErrorException(
        `Shira Payments API request failed with ${response.status}: ${message}`,
      );
    }

    return response.json();
  }
}
