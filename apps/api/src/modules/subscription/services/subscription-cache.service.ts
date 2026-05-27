import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS } from "../providers/redis.provider";
import { CachedSubscription } from "../dto/cached-response.dto";
import { IStarterQuizRestrictionHandlerService } from "../interfaces/services/starter-quiz-restriction-handler.subscription.service.interface";
import { ISubscriptionCacheService } from "../interfaces/services/subscription-cache.service.interface";
import { IShiraPaymentsService } from "../interfaces/services/shira-payments.service.interface";
import { TYPES } from "../interfaces";
import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { ApiLogger } from "src/utils/logger/api-logger.service";

@Injectable()
export class SubscriptionCacheService implements ISubscriptionCacheService {
  private readonly ttlSeconds = Number(process.env.SUBSCRIPTION_CACHE_TTL || 300);
  private readonly logger = new ApiLogger(SubscriptionCacheService.name);

  constructor(
    @Inject(REDIS)
    private readonly redis: Redis,
    @Inject(TYPES.services.IShiraPaymentsService)
    private readonly shiraPaymentsService: IShiraPaymentsService,
    @Inject(TYPES.services.IStarterQuizRestrictionHandlerService)
    private readonly starterQuizRestrictionHandlerService: IStarterQuizRestrictionHandlerService,
  ) { }

  async getCurrentSubscription(organizationId: string, spaceId: number): Promise<CachedSubscription> {
    const cacheKey = this.buildKey(organizationId);
    const cached = await this.redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as CachedSubscription;
    }

    return this.refresh(organizationId, spaceId);
  }

  async refresh(organizationId: string, spaceId: number): Promise<CachedSubscription> {
    const cacheKey = this.buildKey(organizationId);
    const fallbackSubscription = this.buildDefaultSubscription(organizationId);

    try {
      const response = await this.shiraPaymentsService.getSubscription(organizationId);
      const normalized = this.normalizeSubscription(
        organizationId,
        (response?.subscription as Record<string, unknown> | undefined) ?? fallbackSubscription,
      );

      if (this.isSubscriptionRestricted(normalized)) {
        await this.starterQuizRestrictionHandlerService.execute(organizationId, spaceId);
      }

      await this.setCache(cacheKey, normalized);
      return normalized;
    } catch (error) {
      this.logger.error(
        `Falling back to starter subscription because shira-payments is unavailable`,
      );
      await this.setCache(cacheKey, fallbackSubscription);
      return fallbackSubscription;
    }
  }

  async invalidate(organizationId: string): Promise<void> {
    await this.redis.del(this.buildKey(organizationId));
  }

  private buildKey(organizationId: string): string {
    return `subscription:organization:${organizationId}`;
  }

  private async setCache(
    key: string,
    subscription: CachedSubscription,
  ): Promise<void> {
    await this.redis.set(key, JSON.stringify(subscription), "EX", this.ttlSeconds);
  }

  private normalizeSubscription(
    organizationId: string,
    subscription: Record<string, unknown>,
  ): CachedSubscription {
    return {
      organizationId,
      status: String(subscription.status || "active"),
      type: String(subscription.type || "starter"),
      createdAt: subscription.createdAt
        ? String(subscription.createdAt)
        : null,
    };
  }

  private buildDefaultSubscription(organizationId: string): CachedSubscription {
    return {
      organizationId,
      status: "active",
      type: "starter",
      createdAt: null,
    };
  }

  private isSubscriptionRestricted(subscription: CachedSubscription): boolean {
    return subscription.status === "canceled" || subscription.type === "starter";
  }
}
