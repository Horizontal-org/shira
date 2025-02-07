import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SpaceEntity } from '../domain/space.entity';
import { ICheckSpaceService } from '../interfaces/services/check.space.service.interface';
import { CreateSpaceDto } from '../domain/create.space.dto';
import { ICreateSpaceService } from '../interfaces/services/create.space.service.interface';


@Injectable()
export class CreateSpaceService implements ICreateSpaceService{

  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
  ) {}

  async execute (createSpaceDto: CreateSpaceDto) {
  console.log("🚀 ~ CreateSpaceService ~ execute ~ createSpaceDto:", createSpaceDto)

    const space = new SpaceEntity()
    space.name = createSpaceDto.name
    space.users = [createSpaceDto.firstUser]
    console.log('space entity ', space)
    await this.spaceRepo.save(space)

    return
  }
}