import { Body, Inject, NotFoundException, Post } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { ICreateSpaceService } from '../interfaces/services/create.space.service.interface';
import { CreateSpaceWithEmailDto } from '../domain/create-with-email.space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { Repository } from 'typeorm';

@AuthController('space')
export class CreateSpaceController {

  constructor(
    @Inject(TYPES.services.ICreateSpaceService)
    private createSpaceService: ICreateSpaceService,    
    @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
) {}

  @Post('')
  @Roles(Role.SuperAdmin)
  async handler(    
    @Body() createSpaceWithEmailDto: CreateSpaceWithEmailDto
) {

    try {
        console.log('here', createSpaceWithEmailDto)
        const user = await this.userRepo.findOneOrFail({ where: { email: createSpaceWithEmailDto.email } })
        // todo: talk with juan about this controller before merging
        // await this.createSpaceService.execute({
        //     name: createSpaceWithEmailDto.name,
        //     firstUser: user,
        //     slug: ""
        // })
    } catch (e) {
        console.log("🚀 ~ CreateSpaceController ~ e:", e)    
        throw new NotFoundException()
    }
  }
}
