import { SpaceEntity } from "../../domain/space.entity";

export interface IValidateHeaderSpaceService {
  execute(userId: number, spaceId: number): Promise<SpaceEntity>;
}
