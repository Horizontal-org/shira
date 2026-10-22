import { Body, NotFoundException, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { SpaceId } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Repository } from 'typeorm';
import { UpdateResultsEnabledSpaceDto } from '../domain/update-results-enabled.space.dto';
import { SpaceEntity } from '../domain/space.entity';

@AuthController("space")
export class UpdateResultsEnabledSpaceController {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
  ) { }

  @Patch("results-enabled")
  @Roles(Role.SpaceAdmin)
  async update(
    @Body() dto: UpdateResultsEnabledSpaceDto,
    @SpaceId() spaceId: number,
  ) {
    const result = await this.spaceRepository.update(spaceId, {
      hasResultsEnabled: dto.hasResultsEnabled,
    });

    if (!result.affected) {
      throw new NotFoundException("Space not found");
    }

    return { hasResultsEnabled: dto.hasResultsEnabled };
  }
}
