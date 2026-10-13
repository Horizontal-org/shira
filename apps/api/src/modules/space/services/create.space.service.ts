import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { generatePrefixedId } from 'src/utils/prefixed-id.utils';
import { SpaceEntity } from '../domain/space.entity';
import { CreateSpaceDto } from '../domain/create.space.dto';
import { ICreateSpaceService } from '../interfaces/services/create.space.service.interface';
import { SpaceUserEntity } from '../domain/space-users.entity';
import { Role } from 'src/modules/user/domain/role.enum';
import { RoleEntity } from 'src/modules/user/domain/role.entity';
import { TYPES as QUIZ_TYPES } from 'src/modules/quiz/interfaces';
import { IImportQuizService } from 'src/modules/quiz/interfaces/services/import.quiz.service.interface';
import { QuizVisibility } from 'src/modules/quiz/dto/quiz-visibility-enum.quiz';
import { QuizImportValidationResult } from 'src/modules/quiz/services/validate-import.quiz.service';
import { ApiLogger } from 'src/utils/logger/api-logger.service';
import defaultQuiz = require('../default-quiz.json');

const DEFAULT_QUIZ = defaultQuiz as QuizImportValidationResult
@Injectable()
export class CreateSpaceService implements ICreateSpaceService {
  private readonly logger = new ApiLogger(CreateSpaceService.name)

  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectRepository(SpaceUserEntity)
    private readonly spaceUserRepo: Repository<SpaceUserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @Inject(QUIZ_TYPES.services.IImportQuizService)
    private readonly importQuizService: IImportQuizService,
  ) { }

  async execute(createSpaceDto: CreateSpaceDto) {

    const space = new SpaceEntity()
    space.name = createSpaceDto.name
    space.slug = createSpaceDto.slug
    space.organizationId = createSpaceDto.organizationId
    space.publicId = generatePrefixedId('spc_')
    const savedSpace = await this.spaceRepo.save(space)

    const spaceAdminRole = await this.roleRepo.findOne({
      where: { name: Role.SpaceAdmin }
    })

    if (!spaceAdminRole) {
      throw new Error('Space admin role not found')
    }

    const spaceUser = new SpaceUserEntity()
    spaceUser.userId = createSpaceDto.firstUser.id
    spaceUser.spaceId = savedSpace.id
    spaceUser.roleId = spaceAdminRole.id
    spaceUser.createdAt = new Date()
    spaceUser.updatedAt = new Date()

    await this.spaceUserRepo.save(spaceUser)

    try {
      await this.importQuizService.execute({
        ...DEFAULT_QUIZ,
        visibility: QuizVisibility.Public,
        space: savedSpace,
      })
    } catch (error) {
      this.logger.error(`Error creating default quiz for space ${savedSpace.id}`)
    }

    return
  }
}
