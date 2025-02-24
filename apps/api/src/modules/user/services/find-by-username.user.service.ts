import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../domain/user.entity';
import { IFindByUsernameUserService } from '../interfaces';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';

export class FindByUsernameUserService implements IFindByUsernameUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
  ) {}

  async execute(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email: username } });
        
    if (!user) {
      return null
    }
    
    user.spaces = await this.spaceRepository
      .createQueryBuilder('space')
      .relation(UserEntity, "spaces")
      .of(user)
      .loadMany()
    
    return user;
  }
}
