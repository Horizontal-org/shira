import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IAssociateUserSpaceService } from "../interfaces/services/associate-user.space.controller";
import { AssociateUserDto } from "../domain/associate-user.space.dto";
import { SpaceEntity } from "../domain/space.entity";
import { UserEntity } from "src/modules/user/domain/user.entity";

@Injectable()
export class AssociateUserSpaceService implements IAssociateUserSpaceService {
  constructor(
    @InjectRepository(SpaceEntity)
      private readonly spaceRepository: Repository<SpaceEntity>,
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(dto: AssociateUserDto): Promise<void> {
    const space = await this.spaceRepository.findOne({
      where: { id: dto.spaceId},
      relations: ['users'],
    })

    if(!space) {
      throw new Error('Space not found')
    }

    const user = await this.userRepository.findOne({
      where: { id: dto.userId},
    })
    
    if(!user) {
      throw new Error('User not found')
    }

    if(!space.users) {
      space.users = [];
    }

    const isUserAlreadyAssociated = space.users.some(
      (existingUser) => existingUser.id === user.id
    )

    if(!isUserAlreadyAssociated) {
      space.users.push(user);
      await this.spaceRepository.save(space)
    }
  }
}