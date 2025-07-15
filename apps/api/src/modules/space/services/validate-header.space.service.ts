import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SpaceEntity } from '../domain/space.entity';
import { ICheckSpaceService } from '../interfaces/services/check.space.service.interface';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { IValidateHeaderSpaceService } from '../interfaces/services/validate-header.space.service.interface';
import { SpaceUserEntity } from '../domain/space-users.entity';

@Injectable()
export class ValidateHeaderSpaceService implements IValidateHeaderSpaceService{

  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectRepository(SpaceUserEntity)
    private readonly spaceUsersRepo: Repository<any>,
  ) {}

  async execute (userId: number, spaceId: number) {
    
    // load spaces         
    const spaces = await this.spaceRepo
      .createQueryBuilder('space')
      .relation(UserEntity, "spaces")
      .of(userId)
      .loadMany()
      
    
    const space = spaces && spaces.find((space) => { return space.id == spaceId })

    if(!space) {
      return null
    }

    const spaceUserRelation = await this.spaceUsersRepo.findOne({
      where: {
        userId: userId,
        spaceId: spaceId
      }
    })
    
    if (!spaceUserRelation) {
      return null
    }
    
    // Add the role to the space object
    space.role = spaceUserRelation.role
    return space
  }
}