import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  IGetByIdUserApplication,
  TYPES as TYPES_USER,
} from '../../user/interfaces';
import { JWTPayload } from '../domain/jwt-payload.auth.ov';
import { Request } from 'express';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { Role } from 'src/modules/user/domain/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TYPES_USER.applications.IGetByIdUserApplication)
    private readonly getByIdUserApplication: IGetByIdUserApplication
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
    const user = await this.getByIdUserApplication.execute(parseInt(payload.userId))

    if(!user) {
      throw new UnauthorizedException('User not found')
    }

    const loggedUser = new LoggedUserDto()
    loggedUser.id = user.id
    loggedUser.email = user.email
    loggedUser.isSuperAdmin = user.isSuperAdmin

    return loggedUser
  }
}