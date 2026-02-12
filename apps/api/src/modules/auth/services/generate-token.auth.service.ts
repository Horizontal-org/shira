import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ReadUserDto } from '../../user/dto';

import { JWTPayload, JWTResponse } from '../domain';
import { IGenerateTokenAuthService } from '../interfaces';

@Injectable()
export class GenerateTokenAuthService implements IGenerateTokenAuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async execute(user: ReadUserDto): Promise<JWTResponse> {
    const payload: JWTPayload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };
  }
}
