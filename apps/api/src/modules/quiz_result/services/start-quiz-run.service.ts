import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { QuizRun } from '../domain/quiz_runs.entity';
import { Quiz } from '../../quiz/domain/quiz.entity';

@Injectable()
export class StartQuizRunService {
  constructor(
    @InjectRepository(QuizRun)
    private readonly quizRunRepo: Repository<QuizRun>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) {}

  async execute(dto: StartQuizRunDto): Promise<QuizRun> {
    const quizIdNum = Number(dto.quizId);
    const quiz = await this.quizRepo.findOne({ where: { id: quizIdNum } });
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    const run = this.quizRunRepo.create({
      quizId: quizIdNum,
      learnerId: dto.learnerId ?? null,
      startedAt: new Date(dto.startedAt),
    });

    return this.quizRunRepo.save(run);
  }
}
