import { Test, TestingModule } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { CreateQuizController } from '../../src/modules/quiz/controller/create.quiz.controller';
import { TYPES } from '../../src/modules/quiz/interfaces';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { CreateQuizDto } from '../../src/modules/quiz/dto/create.quiz.dto';
import { LoggedUserDto } from '../../src/modules/user/dto/logged.user.dto';
import { SpaceEntity } from '../../src/modules/space/domain/space.entity';

describe('CreateQuizController', () => {
  let controller: CreateQuizController;
  let createQuizService: { execute: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateQuizController],
      providers: [
        {
          provide: TYPES.services.ICreateQuizService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: TYPES.services.IValidateSpaceQuizService,
          useValue: { execute: jest.fn() },
        },
        RolesGuard,
        Reflector,
        {
          provide: 'IUserContextService',
          useValue: { getUser: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CreateQuizController>(CreateQuizController);
    createQuizService = module.get(TYPES.services.ICreateQuizService);
  });

  it('should call validateSpaceQuizService and createQuizService with correct arguments', async () => {
    const space: SpaceEntity = { id: 123 } as any;
    const createQuizDto: CreateQuizDto = { title: "Quiz Title", space } as any;
    const loggedUserDto: LoggedUserDto = { id: 1, email: 'bj@greenday.com', isSuperAdmin: false, activeSpace: space } as any;

    await controller.create(loggedUserDto, createQuizDto);

    expect(createQuizService.execute).toHaveBeenCalledWith(createQuizDto);
  });

  it('should throw UnprocessableEntityException if createQuizService throws', async () => {
    const space: SpaceEntity = { id: 123 } as any;
    const createQuizDto: CreateQuizDto = { title: "Quiz Title", space } as any;
    const loggedUserDto: LoggedUserDto = { id: 1, email: 'bj@greenday.com', isSuperAdmin: false, activeSpace: space } as any;

    (createQuizService.execute as jest.Mock).mockImplementation(() => {
      throw new UnprocessableEntityException();
    });

    await expect(controller.create(loggedUserDto, createQuizDto)).rejects.toThrow(UnprocessableEntityException);
    });
});