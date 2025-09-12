import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRunController } from 'src/modules/quiz_result/controller/question-run.controller';
import { TYPES } from 'src/modules/quiz_result/interfaces';
import { ICreateQuestionRunService } from 'src/modules/quiz_result/interfaces/services/create-question-run.service.interface';

describe('QuestionRunController', () => {
  let controller: QuestionRunController;
  let createQuestionRunService: jest.Mocked<ICreateQuestionRunService>;

  beforeEach(async () => {
    createQuestionRunService = { execute: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionRunController],
      providers: [
        { provide: TYPES.services.ICreateQuestionRunService, useValue: createQuestionRunService },
      ],
    }).compile();

    controller = module.get(QuestionRunController);
    createQuestionRunService = module.get(TYPES.services.ICreateQuestionRunService);
  });

  describe('start', () => {
    it('should call create question run and return result', async () => {
      // Given
      const runId = 17;
      const dto = {
        questionId: 501,
        answer: 'is_legitimate',
        answeredAt: '2025-09-09T18:05:00.000Z',
      } as any;
      const created = {
        id: 1,
        quizRunId: runId,
        questionId: 501,
        answer: 'is_legitimate',
        answeredAt: new Date('2025-09-09T18:05:00.000Z'),
      } as any;

      createQuestionRunService.execute.mockResolvedValue(created);

      // When
      const result = await controller.create(runId, dto);

      // Then
      expect(createQuestionRunService.execute).toHaveBeenCalledWith(runId, dto);
      expect(result).toBe(created);
    });
  });
});

