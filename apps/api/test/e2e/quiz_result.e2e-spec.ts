import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { QuizRunController } from '../../src/modules/quiz_result/controller/quiz-run.controller';
import { QuestionRunController } from '../../src/modules/quiz_result/controller/question-run.controller';
import { StartQuizRunService } from '../../src/modules/quiz_result/services/start-quiz-run.service';
import { FinishQuizRunService } from '../../src/modules/quiz_result/services/finish-quiz-run.service';
import { CreateQuestionRunService } from '../../src/modules/quiz_result/services/create-question-run.service';
import { GetQuizRunsByQuizService } from '../../src/modules/quiz_result/services/get-quiz-runs-by-quiz.service';
import { QuizRun } from '../../src/modules/quiz_result/domain/quiz_runs.entity';
import { QuestionRun } from '../../src/modules/quiz_result/domain/question_runs.entity';
import { Quiz } from '../../src/modules/quiz/domain/quiz.entity';

import { TYPES } from '../../src/modules/quiz_result/interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

describe('QuizResult HTTP (e2e happy paths)', () => {
  let app: INestApplication;

  let quizRunRepo: any;
  let questionRunRepo: any;
  let quizRepo: any;
  let dataSource: any;
  let quizRunsManagerRepo: { save: jest.Mock };
  let questionRunManagerRepo: { create: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    quizRunRepo = { findOne: jest.fn(), create: jest.fn(), save: jest.fn() };
    questionRunRepo = { create: jest.fn(), save: jest.fn() };
    quizRepo = { findOne: jest.fn() };

    quizRunsManagerRepo = { save: jest.fn((x) => x) } as any;
    questionRunManagerRepo = { create: jest.fn((x) => x), save: jest.fn((rows) => rows) } as any;

    const manager = {
      getRepository: jest.fn((entity: any) => {
        if (entity === QuizRun) return quizRunsManagerRepo;
        if (entity === QuestionRun) return questionRunManagerRepo;
        throw new Error('Unknown repo in manager');
      }),
    } as any;

    dataSource = {
      transaction: jest.fn(async (cb: any) => cb(manager)),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuizRunController, QuestionRunController],
      providers: [
        StartQuizRunService,
        FinishQuizRunService,
        CreateQuestionRunService,
        GetQuizRunsByQuizService,

        { provide: TYPES.services.IStartQuizRunService, useExisting: StartQuizRunService },
        { provide: TYPES.services.IFinishQuizRunService, useExisting: FinishQuizRunService },
        { provide: TYPES.services.ICreateQuestionRunService, useExisting: CreateQuestionRunService },
        { provide: TYPES.services.IGetQuizRunsByQuizService, useExisting: GetQuizRunsByQuizService },

        { provide: getRepositoryToken(QuizRun), useValue: quizRunRepo },
        { provide: getRepositoryToken(QuestionRun), useValue: questionRunRepo },
        { provide: getRepositoryToken(Quiz), useValue: quizRepo },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
    jest.clearAllMocks();
  });

  it('POST /quiz-run starts a run (happy path)', async () => {
    // Given: a valid request body and an existing quiz
    const dto = {
      quizId: 42,
      learnerId: 123,
      startedAt: '2025-09-09T12:00:00.000Z',
    };
    quizRepo.findOne.mockResolvedValue({ id: 42 } as Quiz);
    const created = {
      quizId: 42,
      learnerId: 123,
      startedAt: new Date(dto.startedAt),
    } as Partial<QuizRun>;
    quizRunRepo.create.mockReturnValue(created);
    quizRunRepo.save.mockResolvedValue({ id: 1, ...created });

    // When: performing a HTTP POST to the start route
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .post('/quiz-run')
      .send(dto)
      .expect(201);

    // Then: the service and repositories are invoked with the expected values
    expect(quizRepo.findOne).toHaveBeenCalledWith({ where: { id: 42 } });
    expect(quizRunRepo.create).toHaveBeenCalledTimes(1);

    const createArg = quizRunRepo.create.mock.calls[0][0];
    expect(createArg).toEqual(
      expect.objectContaining({ quizId: 42, learnerId: 123, startedAt: expect.any(Date) })
    );
    expect(createArg.startedAt.getTime()).toBe(new Date(dto.startedAt).getTime());

    expect(quizRunRepo.save).toHaveBeenCalledWith(created);

    expect(res.body).toEqual(
      expect.objectContaining({ id: 1, quizId: 42, learnerId: 123 }),
    );
    expect(typeof res.body.startedAt === 'string').toBe(true);
  });

  it('PATCH /quiz-run/:id/finish finishes a run with question runs (happy path)', async () => {
    // Given: an existing run and a valid payload
    const runId = 7;
    const dto = {
      finishedAt: '2025-09-09T12:30:00.000Z',
      questionRuns: [
        { questionId: 101, answer: 'is_phishing', answeredAt: '2025-09-09T12:10:00.000Z' },
        { questionId: 102, answer: 'is_legitimate', answeredAt: '2025-09-09T12:20:00.000Z' },
      ],
    };
    const existingRun = { id: runId, finishedAt: null } as any;
    quizRunRepo.findOne.mockResolvedValue(existingRun);

    // When: performing the HTTP PATCH to finish the run
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .patch(`/quiz-run/${runId}/finish`)
      .send(dto)
      .expect(200);

    // Then: the finishing flow occurs inside a single transaction
    expect(quizRunRepo.findOne).toHaveBeenCalledWith({ where: { id: runId } });
    expect(dataSource.transaction).toHaveBeenCalledTimes(1);

    // And: run is saved via manager repository
    expect(quizRunsManagerRepo.save).toHaveBeenCalledWith(existingRun);

    // And: question runs are created with correct fields and Date instances
    expect(questionRunManagerRepo.create).toHaveBeenCalledTimes(2);
    expect(questionRunManagerRepo.create).toHaveBeenNthCalledWith(1, expect.objectContaining({
      quizRunId: runId,
      questionId: 101,
      answer: 'is_phishing',
      answeredAt: expect.any(Date),
    }));
    expect(questionRunManagerRepo.create).toHaveBeenNthCalledWith(2, expect.objectContaining({
      quizRunId: runId,
      questionId: 102,
      answer: 'is_legitimate',
      answeredAt: expect.any(Date),
    }));

    // And: rows are saved as an array of two
    const savedRowsArg = questionRunManagerRepo.save.mock.calls[0][0];
    expect(Array.isArray(savedRowsArg)).toBe(true);
    expect(savedRowsArg).toHaveLength(2);

    // And: finishedAt is updated and serialized in response
    expect(existingRun.finishedAt).toBeInstanceOf(Date);
    expect(existingRun.finishedAt!.getTime()).toBe(new Date(dto.finishedAt).getTime());
    expect(res.body).toEqual(
      expect.objectContaining({ id: runId })
    );
    expect(typeof res.body.finishedAt === 'string').toBe(true);
  });

  it('POST /quiz-run/:runId/question-run creates a question run (happy path)', async () => {
    // Given: an existing run and a valid question run payload
    const runId = 13;
    const dto = {
      questionId: 501,
      answer: 'is_legitimate',
      answeredAt: '2025-09-09T12:05:00.000Z',
    };
    quizRunRepo.findOne.mockResolvedValue({ id: runId } as QuizRun);
    const created = { quizRunId: runId, ...dto, answeredAt: new Date(dto.answeredAt) } as any;
    questionRunRepo.create.mockReturnValue(created);
    questionRunRepo.save.mockResolvedValue({ id: 9001, ...created });

    // When: performing the HTTP POST to the question-run creation route
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .post(`/quiz-run/${runId}/question-run`)
      .send(dto)
      .expect(201);

    // Then: validates repository calls and Date conversions
    expect(quizRunRepo.findOne).toHaveBeenCalledWith({ where: { id: runId } });
    expect(questionRunRepo.create).toHaveBeenCalledTimes(1);
    const qCreateArg = questionRunRepo.create.mock.calls[0][0];
    expect(qCreateArg).toEqual(expect.objectContaining({
      quizRunId: runId,
      questionId: 501,
      answer: 'is_legitimate',
      answeredAt: expect.any(Date),
    }));
    expect(qCreateArg.answeredAt.getTime()).toBe(new Date(dto.answeredAt).getTime());
    expect(questionRunRepo.save).toHaveBeenCalled();
    expect(res.body).toEqual(
      expect.objectContaining({ id: 9001, quizRunId: runId, questionId: 501 })
    );
  });

  it('GET /quiz-run/:quizId returns finished runs as { name, finishedAt }', async () => {
    // Given: some runs for a quiz id (one unfinished)
    const quizId = 99;
    const finished = [
      { id: 2, quizId, finishedAt: new Date('2025-01-03T00:00:00.000Z') },
      { id: 3, quizId, finishedAt: new Date('2025-01-04T00:00:00.000Z') },
      { id: 4, quizId },
    ] as any[];
    quizRunRepo.find = jest.fn().mockResolvedValue(finished.filter((r) => r.finishedAt));
    quizRepo.findOne = jest.fn().mockResolvedValue({ id: quizId, title: 'Security awareness (whatsapp)' });

    // When: requesting the runs by quiz id
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .get(`/quiz-run/${quizId}`)
      .expect(200);

    // Then: only finished runs are returned as DTOs and dates are serialized
    expect(quizRunRepo.find).toHaveBeenCalledWith({
      where: { quizId, finishedAt: expect.any(Object) },
      order: { finishedAt: 'DESC', id: 'DESC' },
    });
    expect(res.body).toHaveLength(2);
    for (const item of res.body) {
      expect(item).toEqual(
        expect.objectContaining({ name: 'Security awareness (whatsapp)', finishedAt: expect.any(String) })
      );
    }
  });
});
