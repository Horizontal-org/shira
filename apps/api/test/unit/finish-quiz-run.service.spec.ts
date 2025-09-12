import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FinishQuizRunService } from 'src/modules/quiz/services/finish-quiz-run.service';
import { QuizRuns } from 'src/modules/quiz/domain/quiz_runs.entity';
import { QuestionRun } from 'src/modules/quiz/domain/question_runs.entity';

describe('FinishQuizRunService', () => {
  let service: FinishQuizRunService;

  let quizRunRepo: { findOne: jest.Mock };
  let questionRunRepo: object;

  let dataSource: { transaction: jest.Mock };
  let quizRunsManagerRepo: { save: jest.Mock };
  let questionRunManagerRepo: { create: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    quizRunRepo = { findOne: jest.fn() };
    questionRunRepo = {};

    quizRunsManagerRepo = { save: jest.fn() };
    questionRunManagerRepo = {
      create: jest.fn((row: any) => ({ ...row })),
      save: jest.fn(),
    };

    const manager = {
      getRepository: jest.fn((entity: any) => {
        if (entity === QuizRuns) return quizRunsManagerRepo;
        if (entity === QuestionRun) return questionRunManagerRepo;
        throw new Error('Unknown repository requested');
      }),
    };

    dataSource = {
      transaction: jest.fn(async (cb: any) => cb(manager)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinishQuizRunService,
        { provide: getRepositoryToken(QuizRuns), useValue: quizRunRepo },
        { provide: getRepositoryToken(QuestionRun), useValue: questionRunRepo },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    service = module.get(FinishQuizRunService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('finishes a run and inserts question runs in a single transaction', async () => {
    // Given
    const runId = 5;
    const finishedAtISO = '2025-09-09T16:00:00.000Z';
    const dto = {
      finishedAt: finishedAtISO,
      questionRuns: [
        { questionId: 101, answer: 'is_phishing',  answeredAt: '2025-09-09T16:01:00.000Z' },
        { questionId: 102, answer: 'is_legitimate', answeredAt: '2025-09-09T16:02:00.000Z' },
      ],
    };

    const existingRun = { id: String(runId), finishedAt: null } as any;
    quizRunRepo.findOne.mockResolvedValue(existingRun);

    // When
    const result = await service.execute(runId, dto as any);

    // Then: finds the run by numeric id
    expect(quizRunRepo.findOne).toHaveBeenCalledWith({ where: { id: runId } });

    // And: a single transaction is used
    expect(dataSource.transaction).toHaveBeenCalledTimes(1);

    // And: run gets finishedAt updated and saved via the manager repo
    expect(existingRun.finishedAt).toBeInstanceOf(Date);
    expect(existingRun.finishedAt.getTime()).toBe(new Date(finishedAtISO).getTime());
    expect(quizRunsManagerRepo.save).toHaveBeenCalledWith(existingRun);

    // And: question runs are created + bulk saved
    expect(questionRunManagerRepo.create).toHaveBeenCalledTimes(2);
    expect(questionRunManagerRepo.create).toHaveBeenNthCalledWith(1, expect.objectContaining({
      questionId: 101,
      answer: 'is_phishing',
      answeredAt: expect.any(Date),
    }));
    expect(questionRunManagerRepo.create).toHaveBeenNthCalledWith(2, expect.objectContaining({
      questionId: 102,
      answer: 'is_legitimate',
      answeredAt: expect.any(Date),
    }));

    // And: saved array contains created rows with Date fields
    const savedRowsArg = questionRunManagerRepo.save.mock.calls[0][0];
    expect(Array.isArray(savedRowsArg)).toBe(true);
    expect(savedRowsArg).toHaveLength(2);
    savedRowsArg.forEach((row: any, idx: number) => {
      expect(row.answeredAt).toBeInstanceOf(Date);
      const dtoRow = dto.questionRuns![idx];
      expect(row.questionId).toBe(dtoRow.questionId);
      expect(row.answer).toBe(dtoRow.answer);
      expect(row.answeredAt.getTime()).toBe(new Date(dtoRow.answeredAt).getTime());
    });

    // And: returns the updated run
    expect(result).toBe(existingRun);
  });

  it('finishes a run without inserting question runs when dto.questionRuns is empty/undefined', async () => {
    // Given
    const runId = 7;
    const finishedAtISO = '2025-09-09T17:00:00.000Z';
    const dto = { finishedAt: finishedAtISO }; // no questionRuns

    const existingRun = { id: String(runId) } as any;
    quizRunRepo.findOne.mockResolvedValue(existingRun);

    // When
    const result = await service.execute(runId, dto as any);

    // Then
    expect(quizRunRepo.findOne).toHaveBeenCalledWith({ where: { id: runId } });
    expect(dataSource.transaction).toHaveBeenCalledTimes(1);
    expect(quizRunsManagerRepo.save).toHaveBeenCalledWith(existingRun);

    // And: no question-run create/save calls
    expect(questionRunManagerRepo.create).not.toHaveBeenCalled();
    expect(questionRunManagerRepo.save).not.toHaveBeenCalled();

    expect(existingRun.finishedAt.getTime()).toBe(new Date(finishedAtISO).getTime());
    expect(result).toBe(existingRun);
  });

  it('throws NotFoundException if the run does not exist', async () => {
    // Given
    quizRunRepo.findOne.mockResolvedValue(null);

    // When / Then
    await expect(
      service.execute(999, { finishedAt: '2025-01-01T00:00:00.000Z' } as any),
    ).rejects.toBeInstanceOf(NotFoundException);

    // And: no transaction should occur
    expect(dataSource.transaction).not.toHaveBeenCalled();
  });
});
