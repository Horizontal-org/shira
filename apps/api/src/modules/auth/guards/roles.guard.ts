
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


    // if super admin access to everything
    if (user.role === Role.SuperAdmin) {        
        return true
    }

    // if @Roles decorator not set fail request
    if (!requiredRoles) {
      return false;
    }

    // if doesnt meet role fail request
    if (!requiredRoles.some((role) => user.role ===role)){
      return false
    }
    
    // doesnt have required header then fails 
    if (!request.headers['x-space']) {
      return false
    }

    const space = await this.validateHeader.execute(user.id, parseInt(request.headers['x-space']))  

    // doesnt have access to space then fail
    if (!space) {
      return false
    }

    user.space = space
    request['user'] = user
    return true
    
  }
}
