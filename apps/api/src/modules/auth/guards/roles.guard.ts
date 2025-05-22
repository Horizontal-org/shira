
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/user/domain/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { TYPES } from 'src/modules/space/interfaces';
import { IValidateHeaderSpaceService } from 'src/modules/space/interfaces/services/validate-header.space.service.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(TYPES.services.IValidateHeaderSpaceService)
    private validateHeader: IValidateHeaderSpaceService,    
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user


    // if @Roles decorator not set fail request
    if (!requiredRoles) {
      return false;
    }

    // super admin bypass role checks
    if(user.isSuperAdmin) {
      return true
    }

    // check if user has active space or organization with required role
    let hasRequiredRole = false
    if(user.activeSpace && requiredRoles.includes(user.activeSpace.role)) {
      hasRequiredRole = true
    }

    if (user.activeOrganization && requiredRoles.includes(user.activeOrganization.role)) {
      hasRequiredRole = true
    }
    if (!hasRequiredRole) {
      return false;
    }
    
    
    // check if there's an X-Space header for space related endpoints
    if(request.headers['x-space']) {
      const spaceId = parseInt(request.headers['x-space'])

      const space = await this.validateHeader.execute(user.id, spaceId);
      if(!space) {
        return false
      }

      user.activeSpace = {
        space: space,
        role: Role.SpaceAdmin // change this
      }

      request.user = user
    }
    return true
    
  }
}
