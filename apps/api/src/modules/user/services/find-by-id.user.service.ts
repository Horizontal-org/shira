import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../domain/user.entity';
import { NotFoundUserException } from '../exceptions';
import { IFindByIdUserService } from '../interfaces';

export class FindByidUserService implements IFindByIdUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundUserException();

    return user;
  }
}
