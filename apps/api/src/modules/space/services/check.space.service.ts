import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SpaceEntity } from '../domain/space.entity';
import { ICheckSpaceService } from '../interfaces/services/check.space.service.interface';


@Injectable()
export class CheckSpaceService implements ICheckSpaceService{

  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
  ) {}

  async execute (name: string) {
    
    const entity = await this.spaceRepo.findOne({ where: {
        name: name
    }})
    console.log("🚀 ~ CheckPassphraseService ~ execute ~ entity:", entity)
    
    return !!(entity)
  }
}