import { CachedSubscription } from "../../dto/cached-response.dto"

export interface ISubscriptionCacheService {
    getCurrentSubscription(organizationId: string, spaceId: number): Promise<CachedSubscription | null>
    refresh(organizationId: string, spaceId: number): Promise<CachedSubscription | null>
    invalidate(organizationId: string): Promise<void>
}