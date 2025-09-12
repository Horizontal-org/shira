import { Test, TestingModule } from '@nestjs/testing';
import { GetResultQuizController } from '../../src/modules/quiz_result/controller/get-result.quiz.controller';
import { TYPES } from '../../src/modules/quiz_result/interfaces';
import { RolesGuard } from '../../src/modules/auth/guards/roles.guard';

describe('GetResultQuizController', () => {
  let controller: GetResultQuizController;
  let getResultQuizService: { execute: jest.Mock };
  let validateSpaceQuizService: { execute: jest.Mock };

  beforeEach(async () => {
    getResultQuizService = { execute: jest.fn() };
    validateSpaceQuizService = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetResultQuizController],
      providers: [
        {
          provide: TYPES.services.IGetResultQuizService,
          useValue: getResultQuizService,
        },
        {
          provide: TYPES.services.IValidateSpaceQuizService,
          useValue: validateSpaceQuizService,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<GetResultQuizController>(GetResultQuizController);
  });

  it('calls validate + service with (spaceId, quizId)', async () => {
    const quizId = 123;
    const spaceId = 9;
    getResultQuizService.execute.mockResolvedValue('ok');

    await expect(controller.getResultById(quizId, spaceId)).resolves.toBe('ok');

    expect(validateSpaceQuizService.execute).toHaveBeenCalledWith(spaceId, quizId);
    expect(getResultQuizService.execute).toHaveBeenCalledWith(quizId, spaceId);
  });
});
