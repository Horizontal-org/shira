import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { hashPassword } from '../../../utils/password.utils';

import { CreateUserDto, ReadUserDto } from '../dto';
import {
  TYPES,
  ICreateUserApplication,
  ICreateUserService,
} from '../interfaces';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    @Inject(TYPES.services.ICreateUserService)
    private readonly createUserService: ICreateUserService,
  ) {}
  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {    
    let user = null
    try {
      user = await this.createUserService.execute({
        ...createUserDto,
      });
    } catch (e) {
      console.log("🚀 ~ file: create.user.application.ts ~ line 30 ~ CreateUserApplication ~ execute ~ e", e)      
      throw new InternalServerErrorException()
    }

    return user
  }
}
