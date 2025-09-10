import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { GetResultQuizService } from '../../src/modules/quiz/services/get-result.quiz.service';
import { QuizRuns } from '../../src/modules/quiz/domain/quiz_runs.entity';
import { Quiz } from '../../src/modules/quiz/domain/quiz.entity';
import { QuizQuestion } from '../../src/modules/quiz/domain/quizzes_questions.entity';
import { QuestionRun } from '../../src/modules/quiz/domain/question_runs.entity';
import { ReadResultQuizDto } from '../../src/modules/quiz/dto/read-result.quiz.dto';

describe('GetResultQuizService', () => {
  let service: GetResultQuizService;

  let quizRunRepo: jest.Mocked<Repository<QuizRuns>>;
  let quizRepo: jest.Mocked<Repository<Quiz>>;
  let quizQuestionRepo: jest.Mocked<Repository<QuizQuestion>>;
  let questionRunRepo: jest.Mocked<Repository<QuestionRun>>;

  const QUIZ_ID = 42;
  const SPACE_ID = 7;

  beforeEach(async () => {
    quizRunRepo = { count: jest.fn() } as any;
    quizRepo = { findOne: jest.fn() } as any;
    quizQuestionRepo = { count: jest.fn() } as any;
    questionRunRepo = { createQueryBuilder: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetResultQuizService,
        { provide: getRepositoryToken(QuizRuns), useValue: quizRunRepo },
        { provide: getRepositoryToken(Quiz), useValue: quizRepo },
        { provide: getRepositoryToken(QuizQuestion), useValue: quizQuestionRepo },
        { provide: getRepositoryToken(QuestionRun), useValue: questionRunRepo },
      ],
    }).compile();

    service = module.get(GetResultQuizService);
  });

  afterEach(() => jest.clearAllMocks());

  it('returns quiz results with completedCount and averageScore', async () => {
    // Given: quiz exists
    (quizRepo.findOne as jest.Mock).mockResolvedValue({ id: QUIZ_ID, title: 'Security Awareness' } as any);

    // And: 10 questions, 27 completed runs
    (quizQuestionRepo.count as jest.Mock).mockResolvedValue(10);
    (quizRunRepo.count as jest.Mock).mockResolvedValue(27);

    // And: total correct answers across this quiz = 201
    const qbCorrect = makeQB({
      getRawOne: jest.fn().mockResolvedValue({ correctCount: '201' }),
    });
    (questionRunRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbCorrect);

    // When
    const result = await service.execute(QUIZ_ID, SPACE_ID);

    // Then
    const expected: ReadResultQuizDto = {
      quiz: { id: QUIZ_ID, title: 'Security Awareness', totalQuestions: 10 },
      metrics: { completedCount: 27, averageScore: 74.4 },
    };
    expect(result).toEqual(expected);

    // And: QueryBuilder was built on question_runs with the expected alias and filter
    expect(questionRunRepo.createQueryBuilder).toHaveBeenCalledWith('qr');
    expect(qbCorrect.innerJoin).toHaveBeenCalledWith('questions', 'q', 'q.id = qr.question_id');
    expect(qbCorrect.innerJoin).toHaveBeenCalledWith('quizzes_questions', 'qq', 'qq.question_id = qr.question_id');
    expect(qbCorrect.where).toHaveBeenCalledWith('qq.quiz_id = :quizId', { quizId: QUIZ_ID });
  });

  it('handles null correctCount as zero', async () => {
    // Given: quiz exists
    (quizRepo.findOne as jest.Mock).mockResolvedValue({ id: QUIZ_ID, title: 'Null Case' } as any);
    (quizQuestionRepo.count as jest.Mock).mockResolvedValue(8);
    (quizRunRepo.count as jest.Mock).mockResolvedValue(3);

    const qbCorrect = makeQB({ getRawOne: jest.fn().mockResolvedValue(null) });
    (questionRunRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbCorrect);

    // When
    const result = await service.execute(SPACE_ID, QUIZ_ID);

    // Then: averageScore is 0 when no correct answers
    expect(result).toEqual<ReadResultQuizDto>({
      quiz: { id: QUIZ_ID, title: 'Null Case', totalQuestions: 8 },
      metrics: { completedCount: 3, averageScore: 0 },
    });
  });

  it('average score is 100% when correctCount = completedCount * totalQuestions', async () => {
    // Given: quiz exists
    (quizRepo.findOne as jest.Mock).mockResolvedValue({ id: QUIZ_ID, title: 'Perfect' } as any);
    (quizQuestionRepo.count as jest.Mock).mockResolvedValue(10);
    (quizRunRepo.count as jest.Mock).mockResolvedValue(5);

    const qbCorrect = makeQB({
      getRawOne: jest.fn().mockResolvedValue({ correctCount: '50' }), // 5 * 10
    });
    (questionRunRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbCorrect);

    // When
    const result = await service.execute(SPACE_ID, QUIZ_ID);

    // Then: averageScore is exactly 100%
    expect(result).toEqual<ReadResultQuizDto>({
      quiz: { id: QUIZ_ID, title: 'Perfect', totalQuestions: 10 },
      metrics: { completedCount: 5, averageScore: 100 },
    });
  });

  it('rounds half-up from 74.45 to 74.5', async () => {
    // Given: quiz exists
    (quizRepo.findOne as jest.Mock).mockResolvedValue({ id: QUIZ_ID, title: 'Half-up' } as any);
    (quizQuestionRepo.count as jest.Mock).mockResolvedValue(100);
    (quizRunRepo.count as jest.Mock).mockResolvedValue(20);

    // And: 1489 / 2000 * 100 = 74.45
    const qbCorrect = makeQB({ getRawOne: jest.fn().mockResolvedValue({ correctCount: '1489' }) });
    (questionRunRepo.createQueryBuilder as jest.Mock).mockReturnValue(qbCorrect);

    // When
    const result = await service.execute(SPACE_ID, QUIZ_ID);

    // Then: averageScore is rounded to 74.5
    expect(result).toEqual({
      quiz: { id: QUIZ_ID, title: 'Half-up', totalQuestions: 100 },
      metrics: { completedCount: 20, averageScore: 74.5 },
    });
  });

  it('throws NotFound when quiz does not exist', async () => {
    // Given: quiz does not exist
    (quizRepo.findOne as jest.Mock).mockResolvedValue(null);

    // Then
    await expect(service.execute(SPACE_ID, QUIZ_ID)).rejects.toThrow(NotFoundException);
  });
});

// helper for chaining QueryBuilder calls
function makeQB(overrides: Partial<Record<string, any>> = {}) {
  const self: any = {
    innerJoin: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    addGroupBy: jest.fn().mockReturnThis(),
    setParameters: jest.fn().mockReturnThis(),
    getRawOne: jest.fn(),
    ...overrides,
  };
  return self as { [k: string]: jest.Mock };
}
