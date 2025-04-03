import { Get } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { SpaceEntity } from "../domain/space.entity";
import { Role } from "src/modules/user/domain/role.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorators";

@AuthController('space')
export class ListSpaceController {
  constructor(
    @InjectRepository(SpaceEntity)
      private readonly spaceRepository: Repository<SpaceEntity>
  ) {}

  @Get('')
  @Roles(Role.SuperAdmin)
  async handler() {
    return this.spaceRepository.find({
      relations: ['users'],
    })
  }
}