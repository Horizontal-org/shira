import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class ShiraPaymentsService {

  async createCheckout(dto: { organizationId: number; priceId?: string }) {
    return this.request<{ url: string }>('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }

  async manageSubscription(organizationId: number) {
    return this.request<{ url: string }>(`/subscriptions/manage/${organizationId}`, {
      method: 'POST',
    });
  }

  async getSubscription(organizationId: number) {
    return this.request<{ subscription: Record<string, unknown> }>(
      `/subscriptions/${organizationId}`,
    );
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const baseUrl = process.env.SHIRA_PAYMENTS_URL;
    const apiKey = process.env.SHIRA_PAYMENTS_INTERNAL_KEY;

    const response = await fetch(`${baseUrl}${path}`, {
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
