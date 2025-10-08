import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizRun } from '../domain/quiz_runs.entity';
import { QuizRunInfoDto } from '../dto/quiz-run-info.dto';
import { IGetQuizRunsService } from '../interfaces/services/get-quiz-runs-by-quiz.service.interface';

@Injectable()
export class GetQuizRunsByQuizService implements IGetQuizRunsService {
  constructor(
    @InjectRepository(QuizRun)
    private readonly quizRunRepo: Repository<QuizRun>,
  ) { }

  async getLatestBySpaceId(spaceId: number): Promise<QuizRunInfoDto> {
    const runs = await this.getAllBySpaceId(spaceId);
    return runs.length > 0 ? runs[0] : {} as QuizRunInfoDto;
  }

  async getAllBySpaceId(spaceId: number): Promise<QuizRunInfoDto[]> {
    const runs = await this.quizRunRepo
      .createQueryBuilder('qr')
      .innerJoin('qr.quiz', 'qz')
      .where('qz.space_id = :spaceId', { spaceId })
      .andWhere('qr.finished_at IS NOT NULL')
      .orderBy('qr.finished_at', 'DESC')
      .addOrderBy('qr.id', 'DESC')
      .select([
        'qr.quiz_id AS "quizId"',
        'qz.title AS "name"',
        'qr.finished_at AS "finishedAt"',
      ])
      .getRawMany<QuizRunInfoDto>();

    return runs.map((r) => ({
      quizId: r.quizId,
      name: r.name,
      finishedAt: r.finishedAt,
    }));
  }
}
