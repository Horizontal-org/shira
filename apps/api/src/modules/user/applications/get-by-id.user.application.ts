import { Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { ReadUserDto } from '../dto';
import {
  TYPES,
  IFindByUsernameUserService,
  IGetByIdUserApplication,
  IFindByIdUserService,
} from '../interfaces';

export class GetByIdUserApplication implements IGetByIdUserApplication {
  constructor(
    @Inject(TYPES.services.IFindByIdUserService)
    private readonly findByIdUserService: IFindByIdUserService,
  ) {}

  async execute(userId: number): Promise<ReadUserDto> {
    const user = this.findByIdUserService.execute(userId);
    return plainToClass(ReadUserDto, user);
  }
}
