import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizRuns } from '../../quiz/domain/quiz_runs.entity';
import { QuestionRun } from '../../quiz/domain/question_runs.entity';
import { CreateQuestionRunDto } from '../dto/create-question-run.quiz';

@Injectable()
export class CreateQuestionRunService {
  constructor(
    @InjectRepository(QuizRuns) private readonly quizRunRepo: Repository<QuizRuns>,
    @InjectRepository(QuestionRun) private readonly questionRunRepo: Repository<QuestionRun>,
  ) {}

  async execute(runId: number, dto: CreateQuestionRunDto): Promise<QuestionRun> {
    const run = await this.quizRunRepo.findOne({ where: { id: runId } });
    if (!run) throw new NotFoundException('Quiz run not found');

    const qr = this.questionRunRepo.create({
      quizRunId: run.id,
      questionId: dto.questionId,
      answer: dto.answer,
    });

    return this.questionRunRepo.save(qr);
  }
}
