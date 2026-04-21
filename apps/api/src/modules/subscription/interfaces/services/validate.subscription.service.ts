import { CachedSubscription } from "src/modules/subscription/dto/cached-response.dto";

export interface IValidateSubscriptionService {
  execute(sub: CachedSubscription): Promise<void>;
}
