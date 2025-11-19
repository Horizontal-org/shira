import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FinishQuizRunDto } from '../dto/finish-quiz-run.dto';
import { QuizRun } from '../domain/quiz_runs.entity';
import { QuestionRun } from '../domain/question_runs.entity';
import { LearnerQuiz } from 'src/modules/learner/domain/learners_quizzes.entity';

@Injectable()
export class FinishQuizRunService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(QuizRun) private readonly quizRunRepo: Repository<QuizRun>,
  ) {}

  async execute(runId: number, dto: FinishQuizRunDto): Promise<QuizRun> {
    const run = await this.quizRunRepo.findOne({ where: { id: runId } });
    if (!run) throw new NotFoundException('Run not found');

    return this.dataSource.transaction(async (manager) => {
      run.finishedAt = new Date(dto.finishedAt);
      await manager.getRepository(QuizRun).save(run);

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

      if (run.learnerId) {
        const learnerQuizRepo = manager.getRepository(LearnerQuiz);
        const learnerQuiz = await learnerQuizRepo.findOne({ where: { quizId: run.quizId, learnerId: run.learnerId }})
        learnerQuiz.status = 'completed'
        await learnerQuizRepo.save(learnerQuiz)
      }
      
      return run;
    });
  }
}
