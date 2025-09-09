import { Test, TestingModule } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { GetResultQuizController } from '../../src/modules/quiz/controller/get-result.quiz.controller';
import { TYPES } from '../../src/modules/quiz/interfaces';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';

describe('GetResultQuizController', () => {
  let controller: GetResultQuizController;
  let getResultQuizService: { execute: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetResultQuizController],
      providers: [
        {
          provide: TYPES.services.IGetResultQuizService,
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

    controller = module.get<GetResultQuizController>(GetResultQuizController);
    getResultQuizService = module.get(TYPES.services.IGetResultQuizService);
  });

  it('should call getResultQuizService.execute with quizId', async () => {
    getResultQuizService.execute.mockResolvedValue(undefined);
    const quizId = 123;

    await expect(controller.handler(quizId)).resolves.toBeUndefined();
    expect(getResultQuizService.execute).toHaveBeenCalledWith(quizId);
  });
});
