import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FinishQuizRunDto } from '../dto/finish-quiz-run.dto';
import { QuizRuns } from '../domain/quiz_runs.entity';
import { Answer, QuestionRun } from '../domain/question_runs.entity';

@Injectable()
export class FinishQuizRunService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(QuizRuns) private readonly quizRunRepo: Repository<QuizRuns>,
    @InjectRepository(QuestionRun) private readonly questionRunRepo: Repository<QuestionRun>,
  ) {}

  async execute(runId: number, dto: FinishQuizRunDto): Promise<QuizRuns> {
    const run = await this.quizRunRepo.findOne({ where: { id: runId } });
    if (!run) throw new NotFoundException('Run not found');

    // Single transaction: set finished_at and bulk insert question runs
    return this.dataSource.transaction(async (manager) => {
      // 1) update run
      run.finishedAt = new Date(dto.finishedAt);
      await manager.getRepository(QuizRuns).save(run);

      // 2) insert question runs
      if (dto.questionRuns?.length) {
        const repo = manager.getRepository(QuestionRun);
        const rows = dto.questionRuns.map((q) =>
          repo.create({
            quizRunId: run.id,
            questionId: q.questionId,
            answer: q.answer,
            answeredAt: new Date(q.answeredAt),
          }),
        );
        await repo.save(rows);
      }

      return run;
    });
  }
}
