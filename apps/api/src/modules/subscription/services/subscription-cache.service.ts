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

  async getCurrentSubscription(organizationId: string): Promise<CachedSubscription | null> {
    const cacheKey = this.buildKey(organizationId);
    const cached = await this.redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as CachedSubscription;
    }

    return this.refresh(organizationId);
  }

  async refresh(organizationId: string): Promise<CachedSubscription | null> {
    const cacheKey = this.buildKey(organizationId);

    try {
      const response = await this.shiraPaymentsService.getSubscription(organizationId);

      if (!response?.subscription) {
        await this.redis.del(cacheKey);
        return null;
      }

      const normalized = this.normalizeSubscription(
        organizationId,
        response.subscription as Record<string, unknown>,
      );

      await this.setCache(cacheKey, normalized);
      return normalized;
    } catch (error) {
      const fallbackSubscription = this.buildUnknownSubscriptionFromError(
        organizationId,
        error,
      );

      if (!fallbackSubscription) {
        throw error;
      }

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
      status: String(subscription.status || "unknown"),
      createdAt: subscription.createdAt
        ? String(subscription.createdAt)
        : null,
      type: String(subscription.type || "unknown"),
    };
  }

  private buildUnknownSubscriptionFromError(
    organizationId: string,
    error: unknown,
  ): CachedSubscription | null {
    const message = error instanceof Error ? error.message : String(error);

    try {
      const parsed = JSON.parse(message) as {
        message?: string;
        error?: string;
        statusCode?: number;
      };

      if (parsed.statusCode === 404 && parsed.error === "Not Found") {
        return {
          organizationId,
          status: "unknown",
          createdAt: null,
          type: "unknown",
        };
      }

      return null;
    } catch {
      return null;
    }
  }
}
