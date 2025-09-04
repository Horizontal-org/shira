import { Test, TestingModule } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { CreateQuestionQuizController } from '../../src/modules/quiz/controller/create-question.quiz.controller';
import { TYPES } from '../../src/modules/quiz/interfaces';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { CreateQuestionQuizDto } from '../../src/modules/quiz/dto/create-question.quiz.dto';

describe('CreateQuestionQuizController', () => {
  let controller: CreateQuestionQuizController;
  let createQuestionQuizService: { execute: jest.Mock };
  let validateSpaceQuizService: { execute: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateQuestionQuizController],
      providers: [
        {
          provide: TYPES.services.ICreateQuestionQuizService,
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

    controller = module.get<CreateQuestionQuizController>(CreateQuestionQuizController);
    createQuestionQuizService = module.get(TYPES.services.ICreateQuestionQuizService);
    validateSpaceQuizService = module.get(TYPES.services.IValidateSpaceQuizService);
  });

  it('should call validateSpaceQuizService and createQuestionService with correct arguments', async () => {
    const spaceId = 123;
    const quizId = 1;
    const text = "Question?";
    const dto: CreateQuestionQuizDto = { quizId: quizId, text: text } as any;

    await controller.handler(dto, spaceId);

    expect(validateSpaceQuizService.execute).toHaveBeenCalledWith(spaceId, quizId);
    expect(createQuestionQuizService.execute).toHaveBeenCalledWith(dto);
  });

  it('should throw UnprocessableEntityException if createQuestionService throws', async () => {
    const spaceId = 123;
    const quizId = 123;
    const text = "Question?";
    const dto: CreateQuestionQuizDto = { quizId: quizId, text: text } as any;

    (createQuestionQuizService.execute as jest.Mock).mockImplementation(() => {
      throw new UnprocessableEntityException();
    });

    await expect(controller.handler(dto, spaceId)).rejects.toThrow(UnprocessableEntityException);
  });
});