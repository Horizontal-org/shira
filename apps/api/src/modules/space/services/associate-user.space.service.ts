import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { IAssociateUserSpaceService } from "../interfaces/services/associate-user.space.controller"
import { AssociateUserDto } from "../domain/associate-user.space.dto"
import { SpaceEntity } from "../domain/space.entity"
import { SpaceUserEntity } from "../domain/space-users.entity"
import { UserEntity } from "src/modules/user/domain/user.entity"
import { RoleEntity } from "src/modules/user/domain/role.entity"
import { OrganizationUsersEntity } from "src/modules/organization/domain/organization_users.entity"

@Injectable()
export class AssociateUserSpaceService implements IAssociateUserSpaceService {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
    @InjectRepository(SpaceUserEntity)
    private readonly spaceUserRepository: Repository<SpaceUserEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(OrganizationUsersEntity)
    private readonly organizationUsersRepository: Repository<OrganizationUsersEntity>,
  ) {}

  async execute(dto: AssociateUserDto): Promise<void> {
    const space = await this.spaceRepository.findOne({
      where: { id: dto.spaceId },
    })

    if (!space) {
      throw new Error('Space not found')
    }

    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const role = await this.roleRepository.findOne({
      where: { name: dto.roleSlug },
    })

    if (!role) {
      throw new Error(`Role '${dto.roleSlug}' not found`)
    }

    const existingSpaceUser = await this.spaceUserRepository.findOne({
      where: { userId: dto.userId, spaceId: dto.spaceId },
    })

    if (!existingSpaceUser) {
      const now = new Date()
      await this.spaceUserRepository.save(
        this.spaceUserRepository.create({
          userId: dto.userId,
          spaceId: dto.spaceId,
          roleId: role.id,
          createdAt: now,
          updatedAt: now,
        }),
      )
    }

    const existingOrgUser = await this.organizationUsersRepository.findOne({
      where: { userId: dto.userId, organizationId: space.organizationId },
    })

    if (!existingOrgUser) {
      const orgMemberRole = await this.roleRepository.findOne({
        where: { name: 'organization-member' },
      })

      if (!orgMemberRole) {
        throw new Error("Role 'organization-member' not found")
      }

      const now = new Date()
      await this.organizationUsersRepository.save(
        this.organizationUsersRepository.create({
          userId: dto.userId,
          organizationId: space.organizationId,
          roleId: orgMemberRole.id,
          createdAt: now,
          updatedAt: now,
        }),
      )
    }
  }
}
