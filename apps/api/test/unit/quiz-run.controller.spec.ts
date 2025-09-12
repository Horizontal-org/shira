import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { QuizRunController } from 'src/modules/quiz_result/controller/quiz-run.controller';
import { TYPES } from 'src/modules/quiz_result/interfaces';
import { IStartQuizRunService } from 'src/modules/quiz_result/interfaces/services/start-quiz-run.service.interface';
import { IFinishQuizRunService } from 'src/modules/quiz_result/interfaces/services/finish-quiz-run.service.interface';

describe('QuizRunController', () => {
  let controller: QuizRunController;
  let startQuizRunService: jest.Mocked<IStartQuizRunService>;
  let finishQuizRunService: jest.Mocked<IFinishQuizRunService>;

  beforeEach(async () => {
    startQuizRunService = { execute: jest.fn() } as any;
    finishQuizRunService = { execute: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizRunController],
      providers: [
        { provide: TYPES.services.IStartQuizRunService, useValue: startQuizRunService },
        { provide: TYPES.services.IFinishQuizRunService, useValue: finishQuizRunService },
      ],
    }).compile();

    controller = module.get(QuizRunController);
    startQuizRunService = module.get(TYPES.services.IStartQuizRunService);
    finishQuizRunService = module.get(TYPES.services.IFinishQuizRunService);
  });

  describe('start', () => {
    it('should call start service and return run payload', async () => {
      // Given
      const dto = {
        quizId: 42,
        learnerId: 'uuid-123',
        startedAt: '2025-09-09T17:20:00.000Z',
      };
      const savedRun = {
        id: 7,
        quizId: 42,
        learnerId: 'uuid-123',
        startedAt: new Date('2025-09-09T17:20:00.000Z'),
        finishedAt: null,
      } as any;

      startQuizRunService.execute.mockResolvedValue(savedRun);

      // When
      const result = await controller.start(dto as any);

      // Then
      expect(startQuizRunService.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        id: 7,
        quizId: 42,
        learnerId: 'uuid-123',
        startedAt: savedRun.startedAt,
        finishedAt: null,
      });
    });
  });

  describe('finish', () => {
    it('should call finish service and return run payload', async () => {
      // Given
      const runId = 7;
      const dto = {
        finishedAt: '2025-09-09T17:27:10.000Z',
        questionRuns: [
          { questionId: 1001, answer: 'is_phishing', answeredAt: '2025-09-09T17:22:10.000Z' },
          { questionId: 1002, answer: 'is_legitimate', answeredAt: '2025-09-09T17:24:05.000Z' },
        ],
      };
      const finishedRun = {
        id: 7,
        quizId: 42,
        learnerId: 'uuid-123',
        startedAt: new Date('2025-09-09T17:20:00.000Z'),
        finishedAt: new Date('2025-09-09T17:27:10.000Z'),
      } as any;

      finishQuizRunService.execute.mockResolvedValue(finishedRun);

      // When
      const result = await controller.finish(runId, dto as any);

      // Then
      expect(finishQuizRunService.execute).toHaveBeenCalledWith(runId, dto);
      expect(result).toEqual({
        id: 7,
        quizId: 42,
        learnerId: 'uuid-123',
        startedAt: finishedRun.startedAt,
        finishedAt: finishedRun.finishedAt,
      });
    });

    it('should propagate NotFoundException from service', async () => {
      // Given
      const runId = 999;
      const dto = { finishedAt: '2025-09-09T17:27:10.000Z', questionRuns: [] };
      finishQuizRunService.execute.mockRejectedValue(new NotFoundException('Run not found'));

      // When / Then
      await expect(controller.finish(runId, dto as any)).rejects.toBeInstanceOf(NotFoundException);
      expect(finishQuizRunService.execute).toHaveBeenCalledWith(runId, dto);
    });
  });
});
