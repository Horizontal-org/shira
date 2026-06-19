import { Inject, Injectable } from '@nestjs/common'
import { ConsoleService } from 'nestjs-console'
import * as prompt from 'prompt'

import {
  ICreateUserApplication,
  TYPES,
} from '../interfaces'
import { Role } from '../domain/role.enum'
import { hashPassword } from 'src/utils/password.utils'
import { IAssociateUserSpaceService } from '../../space/interfaces/services/associate-user.space.controller'
import { TYPES as SPACE_TYPES } from '../../space/interfaces'

@Injectable()
export class UserCommander {
  constructor(
    @Inject(TYPES.applications.ICreateUserApplication)
    private readonly createUserApplication: ICreateUserApplication,
    @Inject(SPACE_TYPES.services.IAssociateUserSpaceService)
    private readonly associateUserSpaceService: IAssociateUserSpaceService,
    private readonly consoleService: ConsoleService,
  ) {
    const cli = this.consoleService.getCli()
    const groupCommand = this.consoleService.createGroupCommand(
      {
        command: 'users',
        description: 'Create users',
      },
      cli,
    )

    this.consoleService.createCommand(
      { command: 'create <username>' },
      async (username) => {
        try {
          await this.createUser(username)
        } catch (e) {
          console.error(e)
          process.exit(1)
        }
      },
      groupCommand,
    )

    this.consoleService.createCommand(
      { command: 'create-in-space <username>' },
      async (username) => {
        try {
          await this.createUserInSpace(username)
        } catch (e) {
          console.error(e)
          process.exit(1)
        }
      },
      groupCommand,
    )
  }

  private validateRole(roleSlug: string | number): boolean {
    return Object.values(Role).some(r => r === roleSlug)
  }

  private validatePassword(password: string | number): boolean {
    return !!password
  }

  private validateSpaceId(spaceId: string | number): boolean {
    return !!spaceId && !isNaN(Number(spaceId))
  }

  async createUser(username: string) {
    prompt.start()
    const { password, roleSlug } = await prompt.get(['password', 'roleSlug'])

    if (!this.validatePassword(password)) {
      console.log('Password is required')
      return
    }

    if (!this.validateRole(roleSlug)) {
      console.log(`Invalid role '${roleSlug}'. Available roles: ${Object.values(Role).join(', ')}`)
      return
    }

    const user = await this.createUserApplication.execute({
      email: username,
      password: await hashPassword(password.toString()),
      role: roleSlug as string,
    })

    console.log(`User ${username} was created with id ${user.id}`)
  }

  async createUserInSpace(username: string) {
    console.log(`Available roles: ${Object.values(Role).join(', ')}`)
    prompt.start()
    const { password, roleSlug, spaceId } = await prompt.get(['password', 'roleSlug', 'spaceId'])

    if (!this.validatePassword(password)) {
      console.log('Password is required')
      return
    }

    if (!this.validateRole(roleSlug)) {
      console.log(`Invalid role '${roleSlug}'. Available roles: ${Object.values(Role).join(', ')}`)
      return
    }

    if (!this.validateSpaceId(spaceId)) {
      console.log('A valid numeric space ID is required')
      return
    }

    const user = await this.createUserApplication.execute({
      email: username,
      password: await hashPassword(password.toString()),
      role: roleSlug as string,
    })

    await this.associateUserSpaceService.execute({
      userId: user.id,
      spaceId: Number(spaceId),
      roleSlug: roleSlug as string,
    })

    console.log(`User ${username} was created with id ${user.id} and associated with space ${spaceId}`)
  }
}
