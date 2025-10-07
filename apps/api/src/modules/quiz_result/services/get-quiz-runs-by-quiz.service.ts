import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizRun } from '../domain/quiz_runs.entity';

@Injectable()
export class GetQuizRunsByQuizService {
  constructor(
    @InjectRepository(QuizRun)
    private readonly quizRunRepo: Repository<QuizRun>,
  ) {}

  async execute(quizId: number): Promise<QuizRun[]> {
    return this.quizRunRepo.find({
      where: { quizId },
      order: { startedAt: 'DESC', id: 'DESC' },
    });
  }
}
