import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  IGetByIdUserApplication,
  TYPES as TYPES_USER,
} from '../../user/interfaces';
import { JWTPayload } from '../domain/jwt-payload.auth.ov';
import { ReadUserDto } from '../../user/dto';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TYPES_USER.applications.IGetByIdUserApplication)
    private readonly getByIdUserApplication: IGetByIdUserApplication,
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

  async validate(payload: JWTPayload): Promise<ReadUserDto> {
    const user = await this.getByIdUserApplication.execute(parseInt(payload.userId));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
