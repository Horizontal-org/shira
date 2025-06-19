
import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/user/domain/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { 
  IUserContextService,
  TYPES 
} from '../interfaces';
import { UserSpaceContext, UserOrganizationContext } from '../interfaces/services/user-context.service.interface';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(TYPES.services.IUserContextService)
    private userContextService: IUserContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user: LoggedUserDto = request.user

    if (!requiredRoles || requiredRoles.length === 0) {
      return false
    }
    
    const spaceIdHeader = request.headers['x-space']
    const orgIdHeader = request.headers['x-organization']

    let spaceId: number | null = null
    let orgId: number | null = null

    if (spaceIdHeader) {
      spaceId = parseInt(spaceIdHeader)
      if (isNaN(spaceId)) {
        throw new BadRequestException('Invalid X-Space header format')
      }
    }

    if (orgIdHeader) {
      orgId = parseInt(orgIdHeader)
      if (isNaN(orgId)) {
        throw new BadRequestException('Invalid X-Organization header format')
      }
    }

    if(spaceId) {
      try {
        console.log('calling validateSpaceAccess')
        const spaceContext = await this.userContextService.validateUserSpaceAccess(parseInt(user.id), spaceId)
        console.log('spaceContext', spaceContext)
        if(orgId && orgId !== spaceContext.organization.id) {
          throw new ForbiddenException('Space does not belong to the specified organization')
        }

        const spaceEntity = {
          id: spaceContext.space.id,
          name: spaceContext.space.name,
          organizationId: spaceContext.space.organizationId
        } as SpaceEntity;

        // Populate LoggedUserDto structure exactly as expected
        user.activeSpace = {
          space: spaceEntity,
          role: spaceContext.spaceRole as Role
        }
        
        user.activeOrganization = {
          id: spaceContext.organization.id,
          name: spaceContext.organization.name,
          role: spaceContext.organizationRole as Role
        }
      } catch (error) {
        console.log(error)
        throw new ForbiddenException('Invalid space access');
      }
    }

    const hasRequiredRole = this.checkUserRoles(user, requiredRoles)
    if (!hasRequiredRole) {
      throw new ForbiddenException('Insufficient permissions for this action');
    }

    request.user = user
    return true
  }

  private checkUserRoles(user: LoggedUserDto, requiredRoles: Role[]): boolean {
    const userRoles: Role[] = []

    if (user.activeSpace) {
      userRoles.push(user.activeSpace.role)
    }

    if (user.activeOrganization) {
      userRoles.push(user.activeOrganization.role)
    }

    return requiredRoles.some(requiredRole => userRoles.includes(requiredRole))
  }
}
