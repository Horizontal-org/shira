
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
export class SubscriptionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(TYPES.services.IUserContextService)
    private userContextService: IUserContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    const request = context.switchToHttp().getRequest();
    const user: LoggedUserDto = request.user

    if (!user || !user.activeOrganization) {
      throw new ForbiddenException('User does not have an active organization context');
    }
    
    request.subscription = 'something'
    return true
  }

  private checkUserRoles(user: LoggedUserDto, requiredRoles: Role[]): boolean {
    if(user.isSuperAdmin) {
      return true
    }
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
