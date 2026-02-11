import { Inject, Injectable } from '@nestjs/common';
import * as prompt from 'prompt';
import { ICreateUserApplication, TYPES } from '../interfaces';
import { Role } from '../domain/role.enum';
import { hashPassword } from 'src/utils/password.utils';

@Injectable()
export class UserCommander {
  constructor(
    @Inject(TYPES.applications.ICreateUserApplication)
    private readonly createUserApplication: ICreateUserApplication,
  ) { }

  async createUser(username: string) {
    prompt.start();
    const { password, roleSlug } = await prompt.get(['password', 'roleSlug']);

    const role = roleSlug?.toString();
    const roleValid = Object.values(Role).some((r) => r === role);

    if (!roleValid) {
      console.log(`Role ${role} is not a valid role`);
      return;
    }

    const user = await this.createUserApplication.execute({
      email: username,
      password: await hashPassword(password.toString()),
      role,
    });

    console.log(`User ${username} was created with id ${user.id}`);
  }
}
