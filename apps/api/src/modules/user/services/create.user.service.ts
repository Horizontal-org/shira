import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../domain/user.entity';
import { CreateUserDto } from '../dto';
import { AlreadyExistUserException } from '../exceptions';
import { ICreateUserService } from '../interfaces';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute({
    email: username,
    password,
    role
  }: CreateUserDto): Promise<UserEntity> {
    let user = null
    try {
      const exist = await this.userRepository.findOne({
        where: { email: username },
      });
      if (exist) throw new AlreadyExistUserException(username);
      
      user = new UserEntity();
      user.email = username;
      user.password = password;
      user.role = role

    } catch (e) {
      console.log("🚀 ~ file: create.user.service.ts ~ line 26 ~ CreateUserService ~ e", e)      
    }

    return this.userRepository.save(user);
  }
}
