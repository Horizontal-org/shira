import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConsoleService } from 'nestjs-console'
import { Repository } from 'typeorm'
import { SpaceEntity } from '../domain/space.entity'

@Injectable()
export class SpaceCommander {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
    private readonly consoleService: ConsoleService,
  ) {
    const cli = this.consoleService.getCli()
    const groupCommand = this.consoleService.createGroupCommand(
      {
        command: 'spaces',
        description: 'Manage spaces',
      },
      cli,
    )

    this.consoleService.createCommand(
      {
        command: 'list',
      },
      async () => {
        try {
          await this.listSpaces()
        } catch (e) {
          console.error(e)
          process.exit(1)
        }
      },
      groupCommand,
    )
  }

  async listSpaces() {
    const spaces = await this.spaceRepository.find()

    if (spaces.length === 0) {
      console.log('No spaces found')
      return
    }

    console.log(`${'ID'.padEnd(6)} ${'Name'.padEnd(40)} Slug`)
    console.log('-'.repeat(70))
    for (const space of spaces) {
      console.log(`${String(space.id).padEnd(6)} ${space.name.padEnd(40)} ${space.slug ?? ''}`)
    }
  }
}
