import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { QuizRuns } from '../domain/quiz_runs.entity';
import { Quiz } from '../domain/quiz.entity';

@Injectable()
export class StartQuizRunService {
  constructor(
    @InjectRepository(QuizRuns)
    private readonly quizRunRepo: Repository<QuizRuns>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) {}

  async execute(dto: StartQuizRunDto): Promise<QuizRuns> {
    // Optional: ensure quiz exists
    const quizIdNum = Number(dto.quizId);
    const quiz = await this.quizRepo.findOne({ where: { id: quizIdNum } });
    if (!quiz) {
      // keep it generic to not leak info
      throw new Error('Quiz not found');
    }

    const run = this.quizRunRepo.create({
      quizId: String(quizIdNum),
      learnerId: dto.learnerId ?? null,
      startedAt: new Date(dto.startedAt),
    });

    return this.quizRunRepo.save(run);
  }
}
