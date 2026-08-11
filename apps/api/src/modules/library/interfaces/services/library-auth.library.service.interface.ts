import { SpaceEntity } from 'src/modules/space/domain/space.entity'

export interface ILibraryAuthService {
  getOrRegisterApiKey(space: SpaceEntity, spaceDisplayName: string, organizationName: string): Promise<string>
}
