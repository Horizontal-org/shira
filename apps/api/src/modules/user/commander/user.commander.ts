import { Inject, Injectable } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import * as prompt from 'prompt';

import { ReadUserDto } from '../../user/dto';

import {
  ICreateUserApplication,
  TYPES,
} from '../interfaces';
import { Role } from '../domain/role.enum';
import { hashPassword } from 'src/utils/password.utils';

@Injectable()
export class UserCommander {
  constructor(
    @Inject(TYPES.applications.ICreateUserApplication)
    private readonly createUserApplication: ICreateUserApplication,
    private readonly consoleService: ConsoleService,
  ) {
    const cli = this.consoleService.getCli();
    const groupCommand = this.consoleService.createGroupCommand(
      {
        command: 'users',
        description: 'Create users',
      },
      cli,
    )

    this.consoleService.createCommand(
      {
        command: 'create <username>',
      },
      (username) => {
        return this.createUser(username)
      },
      groupCommand,
    );
    
  }

  async createUser(username: string) {
    prompt.start();
    const { password, roleSlug } = await prompt.get(['password', 'roleSlug']);

    const roleValid = Object.values(Role).some(r => r === roleSlug)

    if (!roleValid) {
      console.log(`Role ${roleSlug} is not a valid role`);
      return
    }
    
    const user = await this.createUserApplication.execute({
      email: username,
      password: await hashPassword(password.toString()),
      role: roleSlug
    });

    console.log(`User ${username} was created with id ${user.id} and role ${user.role}`);
  }
 
}