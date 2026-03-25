import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS } from "../providers/redis.provider";
import { ShiraPaymentsService } from "./shira-payments.service";

type CachedSubscription = {
  organizationId: number
  status: string
  stripeCustomerId: string | null
  createdAt: string | null
  source: 'payments-api'
}

@Injectable()
export class SubscriptionCacheService {
  private readonly ttlSeconds = Number(process.env.SUBSCRIPTION_CACHE_TTL || 300);

  constructor(
    @Inject(REDIS) private readonly redis: Redis,
    private readonly shiraPaymentsService: ShiraPaymentsService,
  ) { }

  private key(organizationId: number) {
    return `subscription:organization:${organizationId}`;
  }

  async getCurrentSubscription(organizationId: number) {
    const cached = await this.redis.get(this.key(organizationId));

    if (cached) {
      return JSON.parse(cached) as CachedSubscription;
    }

    return this.refresh(organizationId);
  }

  async refresh(organizationId: number) {
    const response = await this.shiraPaymentsService.getSubscription(organizationId);
    const subscription = response.subscription as Record<string, unknown>;

    const normalized: CachedSubscription = {
      organizationId,
      status: String(subscription.status || 'unknown'),
      stripeCustomerId: subscription.stripeCustomerId
        ? String(subscription.stripeCustomerId)
        : null,
      createdAt: subscription.createdAt ? String(subscription.createdAt) : null,
      source: 'payments-api',
    };

    await this.redis.set(
      this.key(organizationId),
      JSON.stringify(normalized),
      'EX',
      this.ttlSeconds,
    );

    return normalized;
  }

  async invalidate(organizationId: number) {
    await this.redis.del(this.key(organizationId));
  }
}
