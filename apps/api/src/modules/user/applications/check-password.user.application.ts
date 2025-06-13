import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { comparePassword } from '../../../utils/password.utils';

import { InvalidCredentailsUserException } from '../exceptions';
import { CredentialUserDto, ReadUserDto } from '../dto';
import {
  ICheckPasswordUserApplication,
  IFindByUsernameUserService,
  TYPES,
} from '../interfaces';

export class CheckPasswordUserApplication
  implements ICheckPasswordUserApplication {
  constructor(
    @Inject(TYPES.services.IFindByUsernameUserService)
    private readonly findByUsernameUserService: IFindByUsernameUserService,
  ) {}

  async execute(userCredentials: CredentialUserDto): Promise<ReadUserDto> {
    const errors = await validate(userCredentials);
    console.log("🚀 ~ execute ~ errors:", errors)
    if (errors.length > 0) throw new InvalidCredentailsUserException();
    
    const user = await this.findByUsernameUserService.execute(
      userCredentials.email,
    );
    console.log("🚀 ~ execute ~ user:", user)

    if (!user) throw new InvalidCredentailsUserException();

    const isValid = await comparePassword(
      userCredentials.password,
      user.password,
    );
    console.log("🚀 ~ execute ~ isValid:", isValid)

    if (!isValid) throw new InvalidCredentailsUserException();

    return plainToClass(ReadUserDto, user);
  }
}
