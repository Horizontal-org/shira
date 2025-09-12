import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StartQuizRunService } from 'src/modules/quiz_result/services/start-quiz-run.service';
import { QuizRun } from 'src/modules/quiz_result/domain/quiz_runs.entity';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';

describe('StartQuizRunService', () => {
  let service: StartQuizRunService;

  let quizRunRepo: { create: jest.Mock; save: jest.Mock };
  let quizRepo: { findOne: jest.Mock };

  beforeEach(async () => {
    quizRunRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    quizRepo = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartQuizRunService,
        { provide: getRepositoryToken(QuizRun), useValue: quizRunRepo },
        { provide: getRepositoryToken(Quiz), useValue: quizRepo },
      ],
    }).compile();

    service = module.get(StartQuizRunService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates and saves a run when quiz exists (with learnerId)', async () => {
    // Given: an existing quiz and a valid DTO
    const dto = {
      quizId: 42,
      learnerId: 'learner-123',
      startedAt: '2025-09-09T15:00:00.000Z',
    };

    quizRepo.findOne.mockResolvedValue({ id: 42 } as Quiz);

    const createdRun: Partial<QuizRun> = {
      quizId: 42,
      learnerId: 'learner-123',
      startedAt: new Date(dto.startedAt),
    };
    quizRunRepo.create.mockReturnValue(createdRun);
    const savedRun = { id: 1, ...createdRun } as QuizRun;
    quizRunRepo.save.mockResolvedValue(savedRun);

    // When: executing the service
    const result = await service.execute(dto as any);

    // Then: it looks for the quiz by numeric id
    expect(quizRepo.findOne).toHaveBeenCalledWith({ where: { id: 42 } });

    // And: it creates a run with expected fields
    expect(quizRunRepo.create).toHaveBeenCalledTimes(1);
    const createArg = quizRunRepo.create.mock.calls[0][0];
    expect(createArg).toEqual(expect.objectContaining({
      quizId: 42,
      learnerId: 'learner-123',
      startedAt: expect.any(Date),
    }));
    expect(createArg.startedAt.getTime()).toBe(new Date(dto.startedAt).getTime());

    // And: it saves and returns the saved run
    expect(quizRunRepo.save).toHaveBeenCalledWith(createdRun);
    expect(result).toBe(savedRun);
  });

  it('sets learnerId to null when not provided', async () => {
    // Given: an existing quiz and DTO without learnerId
    const dto = {
      quizId: 7,
      startedAt: '2025-09-09T12:34:56.000Z',
    };

    quizRepo.findOne.mockResolvedValue({ id: 7 } as Quiz);

    const createdRun: Partial<QuizRun> = {
      quizId: 7,
      learnerId: null, // important
      startedAt: new Date(dto.startedAt),
    };
    quizRunRepo.create.mockReturnValue(createdRun);
    const savedRun = { id: 99, ...createdRun } as QuizRun;
    quizRunRepo.save.mockResolvedValue(savedRun);

    // When
    const result = await service.execute(dto as any);

    // Then
    expect(quizRepo.findOne).toHaveBeenCalledWith({ where: { id: 7 } });
    const createArg = quizRunRepo.create.mock.calls[0][0];
    expect(createArg.learnerId).toBeNull();
    expect(result).toBe(savedRun);
  });

  it('throws when quiz does not exist', async () => {
    // Given: no quiz found
    const dto = { quizId: 123, startedAt: '2025-01-01T00:00:00.000Z' };
    quizRepo.findOne.mockResolvedValue(null);

    // When / Then
    await expect(service.execute(dto as any)).rejects.toThrow('Quiz not found');

    // And: it never tries to create/save a run
    expect(quizRunRepo.create).not.toHaveBeenCalled();
    expect(quizRunRepo.save).not.toHaveBeenCalled();
  });
});
