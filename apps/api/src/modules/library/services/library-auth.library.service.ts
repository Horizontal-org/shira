import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SpaceEntity } from 'src/modules/space/domain/space.entity'
import { TYPES } from '../interfaces'
import { ILibraryAuthService } from '../interfaces/services/library-auth.library.service.interface'
import { IShiraLibraryService } from '../interfaces/services/shira-library.service.interface'

@Injectable()
export class LibraryAuthService implements ILibraryAuthService {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @Inject(TYPES.services.IShiraLibraryService)
    private readonly shiraLibraryService: IShiraLibraryService,
  ) { }

  async getOrRegisterApiKey(space: SpaceEntity, spaceDisplayName: string, organizationName: string): Promise<string> {
    if (space.libraryApiKey) return space.libraryApiKey

    const { apiKey } = await this.shiraLibraryService.registerAuthor({
      publicSpaceId: space.publicId,
      spaceName: space.name,
      spaceDisplayName,
      organizationName,
    })

    await this.spaceRepo.update(space.id, { libraryApiKey: apiKey })

    return apiKey
  }
}
