import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IListQuizService } from '../interfaces/services/list.quiz.service.interface';
import { plainToInstance } from 'class-transformer';
import { Question } from 'src/modules/question/domain';
import { ReadPlainQuizDto } from '../dto/read-plain.quiz.dto';

@Injectable()
export class ListQuizService implements IListQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) { }

  async execute(spaceId: number) {

    const quizzes = await this.quizRepo
      .createQueryBuilder('quiz')
      .leftJoin(
        qb => {
          return qb
            .from(Question, 'question')
            .innerJoin('quizzes_questions', 'qq', 'qq.questionId = question.id')
            .select('qq.quizId', 'quizId')
            .addSelect('MAX(question.updatedAt)', 'updatedAt')
            .addSelect('MAX(qq.updatedAt)', 'lastQuizQuestionUpdatedAt')
            .addSelect('COUNT(question.id)', 'questionsCount')
            .groupBy('qq.quizId')
        },
        'latest_question',
        'latest_question.quizId = quiz.id'
      )
      .select([
        'quiz.id AS id',
        'quiz.updatedAt AS updatedAt',
        'quiz.title AS title',
        'quiz.hash AS hash',
        'quiz.published AS published',
        'quiz.visibility AS visibility',
        'COALESCE(latest_question.questionsCount, 0) AS questionsCount',
      ])
      .addSelect(`GREATEST
        (
          quiz.updated_at,
          COALESCE(latest_question.updatedAt, '1900-01-01'),
          COALESCE(latest_question.lastQuizQuestionUpdatedAt, '1900-01-01')
        )`, 'latestGlobalUpdate')
      .where('space_id = :spaceId', { spaceId: spaceId })
      .getRawMany()

    return plainToInstance(ReadPlainQuizDto, quizzes);
  }
}
