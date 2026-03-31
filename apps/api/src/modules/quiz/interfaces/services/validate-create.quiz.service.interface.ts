import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { CachedSubscription } from "src/modules/subscription/dto/cached-response.dto";

export interface IValidateCreateQuizService {
  execute(sub: CachedSubscription, visibility: string, spaceId: number): Promise<void>;
}
