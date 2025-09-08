import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { GetResultQuizService } from '../../src/modules/quiz/services/get-result.quiz.service';
import { QuizRuns } from '../../src/modules/quiz/domain/quiz_runs.entity';
import { Quiz } from '../../src/modules/quiz/domain/quiz.entity';
import { QuizQuestion } from '../../src/modules/quiz/domain/quizzes_questions.entity';
import { ReadResultQuizDto } from '../../src/modules/quiz/dto/read-result.quiz.dto';

describe('GetResultQuizService', () => {
  let service: GetResultQuizService;

  // Repository mocks
  let quizRunRepo: jest.Mocked<Repository<QuizRuns>>;
  let quizRepo: jest.Mocked<Repository<Quiz>>;
  let quizQuestionRepo: jest.Mocked<Repository<QuizQuestion>>;

  const QUIZ_ID = 42;

  beforeEach(async () => {
    // Given: repositories with a mocked createQueryBuilder
    quizRunRepo = { createQueryBuilder: jest.fn() } as any;
    quizRepo = { createQueryBuilder: jest.fn() } as any;
    quizQuestionRepo = { createQueryBuilder: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetResultQuizService,
        { provide: getRepositoryToken(QuizRuns), useValue: quizRunRepo },
        { provide: getRepositoryToken(Quiz), useValue: quizRepo },
        { provide: getRepositoryToken(QuizQuestion), useValue: quizQuestionRepo },
      ],
    }).compile();

    service = module.get(GetResultQuizService);
  });

  afterEach(() => jest.clearAllMocks());

  it('returns quiz results with completedCount and averageScore (happy path)', async () => {
    // Given: a quiz with 10 questions
    const qbQuiz = makeQueryBuilders({
      getRawOne: jest.fn().mockResolvedValue({
        id: QUIZ_ID,
        title: 'Security Awareness',
        totalQuestions: '10',
      }),
    });
    (quizRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbQuiz);

    // And: 27 completed runs
    const qbRunsCount = makeQueryBuilders({
      getRawOne: jest.fn().mockResolvedValue({ completedCount: '27' }),
    });

    const qbTotalQ = makeQueryBuilders({
      getQuery: jest.fn().mockReturnValue('SELECT 10'),
    });

    const qbPerRun = makeQueryBuilders({
      getQuery: jest.fn().mockReturnValue('SELECT 0.743 AS score'),
      getParameters: jest.fn().mockReturnValue({ quizId: QUIZ_ID }),
    });

    // And: average score across runs
    const qbAvg = makeQueryBuilders({
      getRawOne: jest.fn().mockResolvedValue({ averageScore: '74.3' }),
    });

    (quizRunRepo.createQueryBuilder as jest.Mock)
      .mockReturnValueOnce(qbRunsCount)
      .mockReturnValueOnce(qbPerRun)
      .mockReturnValueOnce(qbAvg);

    (quizQuestionRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbTotalQ);

    // When: executing the service
    const result = await service.execute(QUIZ_ID);

    // Then: the result includes the quiz info and calculated metrics
    const expected: ReadResultQuizDto = {
      quiz: { id: QUIZ_ID, title: 'Security Awareness', totalQuestions: 10 },
      metrics: { completedCount: 27, averageScore: 74.3 },
    };
    expect(result).toEqual(expected);

    // And: query builder was called with the expected filters
    expect(qbRunsCount.where).toHaveBeenCalledWith('r.quiz_id = :quizId', { quizId: QUIZ_ID });
    expect(qbRunsCount.andWhere).toHaveBeenCalledWith('r.finished_at IS NOT NULL');
    expect(qbAvg.select).toHaveBeenCalledWith('COALESCE(AVG(sub.score), 0) * 100', 'averageScore');
  });

  it('handles no runs and missing average (returns zeros)', async () => {
    // Given: a quiz with 0 questions
    const qbQuiz = makeQueryBuilders({
      getRawOne: jest.fn().mockResolvedValue({
        id: QUIZ_ID,
        title: 'Empty Quiz',
        totalQuestions: '0',
      }),
    });
    (quizRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbQuiz);

    // And: no completed runs
    const qbRunsCount = makeQueryBuilders({
      getRawOne: jest.fn().mockResolvedValue({ completedCount: '0' }),
    });

    const qbTotalQ = makeQueryBuilders({
      getQuery: jest.fn().mockReturnValue('SELECT 0'),
    });

    const qbPerRun = makeQueryBuilders({
      getQuery: jest.fn().mockReturnValue('SELECT 0 AS score'),
      getParameters: jest.fn().mockReturnValue({ quizId: QUIZ_ID }),
    });

    const qbAvg = makeQueryBuilders({
      getRawOne: jest.fn().mockResolvedValue({ averageScore: null as any }),
    });

    (quizRunRepo.createQueryBuilder as jest.Mock)
      .mockReturnValueOnce(qbRunsCount)
      .mockReturnValueOnce(qbPerRun)
      .mockReturnValueOnce(qbAvg);

    (quizQuestionRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbTotalQ);

    // When: executing the service
    const result = await service.execute(QUIZ_ID);

    // Then: the result has 0 totals and metrics
    expect(result).toEqual<ReadResultQuizDto>({
      quiz: { id: QUIZ_ID, title: 'Empty Quiz', totalQuestions: 0 },
      metrics: { completedCount: 0, averageScore: 0 },
    });
  });
});

function makeQueryBuilders<T extends object>(overrides: Partial<Record<string, any>> = {}) {
  const self: any = {
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    setParameters: jest.fn().mockReturnThis(),
    ...overrides,
  };
  return self as T & { [k: string]: jest.Mock };
}
