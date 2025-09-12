import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateQuestionRunService } from 'src/modules/quiz_result/services/create-question-run.service';
import { QuizRun } from 'src/modules/quiz_result/domain/quiz_runs.entity';
import { QuestionRun } from 'src/modules/quiz_result/domain/question_runs.entity';

describe('CreateQuestionRunService', () => {
  let service: CreateQuestionRunService;

  let quizRunRepo: { findOne: jest.Mock };
  let questionRunRepo: { create: jest.Mock; save: jest.Mock };

  beforeEach(async () => {
    quizRunRepo = { findOne: jest.fn() } as any;
    questionRunRepo = { create: jest.fn(), save: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateQuestionRunService,
        { provide: getRepositoryToken(QuizRun), useValue: quizRunRepo },
        { provide: getRepositoryToken(QuestionRun), useValue: questionRunRepo },
      ],
    }).compile();

    service = module.get(CreateQuestionRunService);
  });

  afterEach(() => jest.clearAllMocks());

  it('creates and saves a QuestionRun when the run exists', async () => {
    // Given
    const runId = 10;
    const dto = {
      questionId: 55,
      answer: 'is_phishing',
      answeredAt: '2025-09-09T18:00:00.000Z',
    } as any;

    quizRunRepo.findOne.mockResolvedValue({ id: runId } as QuizRun);

    const created: Partial<QuestionRun> = {
      quizRunId: runId,
      questionId: dto.questionId,
      answer: dto.answer,
      answeredAt: new Date(dto.answeredAt),
    };
    questionRunRepo.create.mockReturnValue(created);
    const saved = { id: 123, ...created } as QuestionRun;
    questionRunRepo.save.mockResolvedValue(saved);

    // When
    const result = await service.execute(runId, dto);

    // Then
    expect(quizRunRepo.findOne).toHaveBeenCalledWith({ where: { id: runId } });
    expect(questionRunRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        quizRunId: runId,
        questionId: dto.questionId,
        answer: dto.answer,
        answeredAt: expect.any(Date),
      }),
    );
    const createArg = questionRunRepo.create.mock.calls[0][0];
    expect(createArg.answeredAt.getTime()).toBe(new Date(dto.answeredAt).getTime());
    expect(questionRunRepo.save).toHaveBeenCalledWith(created);
    expect(result).toBe(saved);
  });

  it('throws NotFoundException when run does not exist', async () => {
    // Given
    quizRunRepo.findOne.mockResolvedValue(null);

    // When / Then
    await expect(
      service.execute(999, {
        questionId: 1,
        answer: 'is_legitimate',
        answeredAt: '2025-01-01T00:00:00.000Z',
      } as any),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(questionRunRepo.create).not.toHaveBeenCalled();
    expect(questionRunRepo.save).not.toHaveBeenCalled();
  });
});

