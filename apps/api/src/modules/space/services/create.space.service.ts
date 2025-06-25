import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SpaceEntity } from '../domain/space.entity';
import { CreateSpaceDto } from '../domain/create.space.dto';
import { ICreateSpaceService } from '../interfaces/services/create.space.service.interface';
import { SpaceUserEntity } from '../domain/space-users.entity';
import { Role } from 'src/modules/user/domain/role.enum';
import { RoleEntity } from 'src/modules/user/domain/role.entity';
@Injectable()
export class CreateSpaceService implements ICreateSpaceService{

  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectRepository(SpaceUserEntity)
    private readonly spaceUserRepo: Repository<SpaceUserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async execute (createSpaceDto: CreateSpaceDto) {

    const space = new SpaceEntity()
    space.name = createSpaceDto.name
    space.slug = createSpaceDto.slug
    space.organizationId = createSpaceDto.organizationId
    const savedSpace = await this.spaceRepo.save(space)

    const spaceAdminRole = await this.roleRepo.findOne({
      where: {name: Role.SpaceAdmin}
    })

    if (!spaceAdminRole) {
      throw new Error('Space admin role not found')
    }

    const spaceUser = new SpaceUserEntity()
    spaceUser.userId = createSpaceDto.firstUser.id
    spaceUser.spaceId = savedSpace.id
    spaceUser.roleId = spaceAdminRole.id
    spaceUser.createdAt = new Date()
    spaceUser.updatedAt = new Date()

    await this.spaceUserRepo.save(spaceUser)

    return
  }
}