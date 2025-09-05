import { Test, TestingModule } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { ReorderQuestionQuizController } from '../../src/modules/quiz/controller/reorder-question.quiz.controller';
import { TYPES } from '../../src/modules/quiz/interfaces';
import { ReorderQuestionQuizDto } from '../../src/modules/quiz/dto/reorder-question.quiz.dto';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';

describe('ReorderQuestionQuizController', () => {
  let controller: ReorderQuestionQuizController;
  let reorderQuestionService: { execute: jest.Mock };
  let validateSpaceQuizService: { execute: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReorderQuestionQuizController],
      providers: [
        {
          provide: TYPES.services.IReorderQuestionQuizService,
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
          useValue: { getUser: jest.fn() }, // mock implementation
        },
      ],
    }).compile();

    controller = module.get<ReorderQuestionQuizController>(ReorderQuestionQuizController);
    reorderQuestionService = module.get(TYPES.services.IReorderQuestionQuizService);
    validateSpaceQuizService = module.get(TYPES.services.IValidateSpaceQuizService);
  });

  it('should call validateSpaceQuizService and reorderQuestionService with correct arguments', async () => {
    const reorderDto: ReorderQuestionQuizDto = { quizId: 1, order: [2, 1, 3] } as any;
    const spaceId = 10;

    await controller.handler(reorderDto, spaceId);

    expect(validateSpaceQuizService.execute).toHaveBeenCalledWith(spaceId, reorderDto.quizId);
    expect(reorderQuestionService.execute).toHaveBeenCalledWith(reorderDto);
  });

  it('should throw UnprocessableEntityException if reorderQuestionService throws', async () => {
    const reorderDto: ReorderQuestionQuizDto = { quizId: 1, order: [2, 1, 3] } as any;
    const spaceId = 10;

    (reorderQuestionService.execute as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    await expect(controller.handler(reorderDto, spaceId)).rejects.toThrow(UnprocessableEntityException);
  });
});
