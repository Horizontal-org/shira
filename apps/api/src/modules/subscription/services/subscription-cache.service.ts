import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS } from "../providers/redis.provider";
import { CachedSubscription } from "../dto/cached-response.dto";
import { ISubscriptionCacheService } from "../interfaces/services/subscription-cache.service.interface";
import { IShiraPaymentsService } from "../interfaces/services/shira-payments.service.interface";
import { TYPES } from "../interfaces";

@Injectable()
export class SubscriptionCacheService implements ISubscriptionCacheService {
  private readonly ttlSeconds = Number(process.env.SUBSCRIPTION_CACHE_TTL || 300);

  constructor(
    @Inject(REDIS) 
    private readonly redis: Redis,
    @Inject(TYPES.services.IShiraPaymentsService)
    private readonly shiraPaymentsService: IShiraPaymentsService,
  ) { }

  private key(organizationId: string) {
    return `subscription:organization:${organizationId}`;
  }

  async getCurrentSubscription(organizationId: string) {
    const cached = await this.redis.get(this.key(organizationId));

    if (cached) {
      return JSON.parse(cached) as CachedSubscription;
    }

    return this.refresh(organizationId);
  }

  async refresh(organizationId: string) {
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

  async invalidate(organizationId: string) {
    await this.redis.del(this.key(organizationId));
  }
}
