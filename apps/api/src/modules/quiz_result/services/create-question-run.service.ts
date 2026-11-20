import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizRun } from '../domain/quiz_runs.entity';
import { QuestionRun } from '../domain/question_runs.entity';
import { CreateQuestionRunDto } from '../dto/create-question-run.quiz';
import { QuizItem } from '../../quiz/domain/quiz_items.entity';
import { ICreateQuestionRunService } from '../interfaces/services/create-question-run.service.interface';
import { findAuthorizedQuizRun } from './find-authorized-quiz-run';

@Injectable()
export class CreateQuestionRunService implements ICreateQuestionRunService {
  constructor(
    @InjectRepository(QuizRun) private readonly quizRunRepo: Repository<QuizRun>,
    @InjectRepository(QuestionRun) private readonly questionRunRepo: Repository<QuestionRun>,
    @InjectRepository(QuizItem) private readonly quizItemRepo: Repository<QuizItem>,
  ) {}

  async execute(runId: number, token: string | undefined, dto: CreateQuestionRunDto): Promise<QuestionRun> {
    const run = await findAuthorizedQuizRun(this.quizRunRepo, runId, token);
    if (run.finishedAt) throw new ConflictException('Run already finished');

    const belongsToQuiz = await this.quizItemRepo.exists({
      where: { quizId: run.quizId, entityType: 'question', entityId: dto.questionId },
    });
    if (!belongsToQuiz) throw new NotFoundException('Question not found in this quiz');

    const qr = this.questionRunRepo.create({
      quizRunId: run.id,
      questionId: dto.questionId,
      answer: dto.answer,
      answeredAt: new Date(dto.answeredAt),
    });

    return this.questionRunRepo.save(qr);
  }
}
