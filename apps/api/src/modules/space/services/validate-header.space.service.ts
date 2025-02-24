import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SpaceEntity } from '../domain/space.entity';
import { ICheckSpaceService } from '../interfaces/services/check.space.service.interface';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { IValidateHeaderSpaceService } from '../interfaces/services/validate-header.space.service.interface';


@Injectable()
export class ValidateHeaderSpaceService implements IValidateHeaderSpaceService{

  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
  ) {}

  async execute (userId: number, spaceId: number) {
    
    // load spaces         
    const spaces = await this.spaceRepo
      .createQueryBuilder('space')
      .relation(UserEntity, "spaces")
      .of(userId)
      .loadMany()
      
    
    const space = spaces && spaces.find((space) => { return space.id == spaceId })
    
    return space
  }
}