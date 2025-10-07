import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { QuizRun } from '../domain/quiz_runs.entity';
import { Quiz } from '../../quiz/domain/quiz.entity';
import { QuizRunInfoDto } from '../dto/quiz-run-info.dto';

@Injectable()
export class GetQuizRunsByQuizService {
  constructor(
    @InjectRepository(QuizRun)
    private readonly quizRunRepo: Repository<QuizRun>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) { }

  async execute(quizId: number): Promise<QuizRunInfoDto[]> {
    const quiz = await this.quizRepo.findOne({ where: { id: quizId } });
    const name = quiz.title;

    const runs = await this.quizRunRepo.find({
      where: { quizId, finishedAt: Not(IsNull()) },
      order: { finishedAt: 'DESC', id: 'DESC' },
    });

    return runs.map((r) => ({ name, finishedAt: r.finishedAt }));
  }
}
