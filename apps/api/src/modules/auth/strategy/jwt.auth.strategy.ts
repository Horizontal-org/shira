import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IGetByIdUserApplication,
  TYPES as TYPES_USER,
} from '../../user/interfaces';
import { JWTPayload } from '../domain/jwt-payload.auth.ov';
import { Request } from 'express';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { SpaceUserEntity } from 'src/modules/space/domain/space-users.entity';
import { OrganizationUsersEntity } from 'src/modules/organization/domain/organization_users.entity';
import { Role } from 'src/modules/user/domain/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TYPES_USER.applications.IGetByIdUserApplication)
    private readonly getByIdUserApplication: IGetByIdUserApplication,
    @InjectRepository(SpaceUserEntity)
    private readonly spaceUsersRepo: Repository<any>,
    @InjectRepository(OrganizationUsersEntity)
    private readonly orgnizationUsersRepo: Repository<any>,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (req?.cookies?.['access_token']) return req.cookies['access_token'];
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload): Promise<LoggedUserDto> {
    const user = await this.getByIdUserApplication.execute(parseInt(payload.userId));

    if (!user) {
      throw new UnauthorizedException();
    }

    const loggedUser = new LoggedUserDto()
    loggedUser.id = user.id
    loggedUser.email = user.email
    loggedUser.isSuperAdmin = user.isSuperAdmin

    const organizationUsers = await this.orgnizationUsersRepo.find({
      where: { userId: user.id},
      relations: ['organization']
    })

    console.log(organizationUsers)
    if(organizationUsers && organizationUsers.length >0) {
      const firstOrgUser = organizationUsers[0]

      const roleString = this.convertRoleNumberToEnum(firstOrgUser.role)
      loggedUser.activeOrganization = {
        id: firstOrgUser.organization.id,
        name: firstOrgUser.organization.name,
        role: roleString
      }
    }
    console.log(organizationUsers)

    // get space_users
    const spaceUsers = await this.spaceUsersRepo.find({
      where: { userId: user.id },
      relations: ['space']
    })

    if(spaceUsers && spaceUsers.length > 0) {
      const firstSpaceUser = spaceUsers[0] // for now let's just use the first one
      
      const roleString = this.convertRoleNumberToEnum(firstSpaceUser.role);
      loggedUser.activeSpace = {
        space: firstSpaceUser.space,
        role: roleString
      }
    }

    return loggedUser;
  }

  private convertRoleNumberToEnum(roleNumber: number): Role {
    const roleMap = {
      1: Role.OrganizationAdmin,
      2: Role.OrganizaitonMember,
      3: Role.SpaceAdmin,
      4: Role.SpaceEditor,
      5: Role.SuperAdmin
    }
    
    return roleMap[roleNumber] || Role.SpaceEditor
  }
}