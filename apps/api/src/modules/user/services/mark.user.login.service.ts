import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class MarkUserLoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) { }

  async execute(userId: number): Promise<void> {
    await this.users.update(
      { id: userId },
      { lastLoginAt: new Date() }
    );
  }
}
