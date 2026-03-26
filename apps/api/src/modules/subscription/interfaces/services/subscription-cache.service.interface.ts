import { CachedSubscription } from "../../dto/cached-response.dto"

export interface ISubscriptionCacheService {
    getCurrentSubscription(organizationId: string): Promise<CachedSubscription | null>
    refresh(organizationId: string): Promise<CachedSubscription | null>
    invalidate(organizationId: string): Promise<void>
}