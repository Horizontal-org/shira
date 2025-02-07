import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ReadUserDto } from '../../user/dto';
import {
  ICheckPasswordUserApplication,
  TYPES as TYPES_USER,
} from '../../user/interfaces';

import { JWTPayload, JWTResponse } from '../domain';
import { IGenerateTokenAuthService } from '../interfaces';

@Injectable()
export class GenerateTokenAuthService implements IGenerateTokenAuthService {
  constructor(
    @Inject(TYPES_USER.applications.ICheckPasswordUserApplication)
    private checkPasswordUserApplication: ICheckPasswordUserApplication,
    private jwtService: JwtService,
  ) {}

  async execute(user: ReadUserDto): Promise<JWTResponse> {
    const payload: JWTPayload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '23h' }),
    };
  }
}
