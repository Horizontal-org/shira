import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SpaceEntity } from "src/modules/space/domain/space.entity"
import { OrganizationUsersEntity } from "src/modules/organization/domain/organization_users.entity"
import { SpaceUserEntity } from "src/modules/space/domain/space-users.entity"
import { 
  IUserContextService, 
  UserSpaceContext, 
  UserOrganizationContext 
} from '../interfaces/services/user-context.service.interface';


@Injectable()
export class UserContextService implements IUserContextService{
  constructor(
    @InjectRepository(SpaceUserEntity)
    private readonly spaceUsersRepo: Repository<SpaceUserEntity>,
    @InjectRepository(OrganizationUsersEntity)
    private readonly orgUsersRepo: Repository<OrganizationUsersEntity>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
  ){}

  async validateUserSpaceAccess(userId: number, spaceId: number): Promise<UserSpaceContext> {
    if(!spaceId) {
      throw new BadRequestException('Space ID is required')
    }

    const space = await this.spaceRepo.findOne({
      where: { id: spaceId},
      relations: ['organization']
    })

    if(!space) {
      throw new ForbiddenException('Space not found')
    }

    const spaceUser = await this.spaceUsersRepo.findOne({
      where: { userId, spaceId },
      relations: ['role']
    })
    
    if(!spaceUser) {
      throw new ForbiddenException('User does not have access to this space')
    }

    const orgUser = await this.orgUsersRepo.findOne({
      where: { userId, organizationId: space.organization.id },
      relations: ['role']
    });

    if (!orgUser) {
      throw new ForbiddenException('User does not have access to this organization')
    }

    return {
      space: {
        id: space.id,
        name: space.name,
        organizationId: space.organization.id
      },
      spaceRole: spaceUser.role.name,
      organization: {
        id: space.organization.id,
        name: space.organization.name
      },
      organizationRole: orgUser.role.name
    }
  }

  async validateUserOrganizationAccess(userId: number, organizationId: number): Promise<UserOrganizationContext> {
    if(organizationId) {
      throw new BadRequestException('Organization ID is required')
    }

    const orgUser = await this.orgUsersRepo.findOne({
      where: { userId, organizationId},
      relations: ['organization', 'role']
    })

    if(!orgUser) {
      throw new ForbiddenException('User does not have access to this organization')
    }

    return {
      organization: {
        id: orgUser.organization.id,
        name: orgUser.organization.name
      },
      organizationRole: orgUser.role.name
    }
  }
}