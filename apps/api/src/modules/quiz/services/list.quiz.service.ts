import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateQuizService } from '../interfaces/services/create.quiz.service.interface';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { CreateQuizDto } from '../dto/create.quiz.dto';
import { IListQuizService } from '../interfaces/services/list.quiz.service.interface';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ReadQuizDto } from '../dto/read.quiz.dto';
import { Question } from 'src/modules/question/domain';
import { ReadPlainQuizDto } from '../dto/read-plain.quiz.dto';


@Injectable()
export class ListQuizService implements IListQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (
    spaceId,
  ) {

    const rawQuizzes = await this.quizRepo
        .createQueryBuilder('quiz')
        .leftJoin(
          qb => {
            return qb
              .from(Question, 'question')
              .innerJoin('quizzes_questions', 'qq', 'qq.questionId = question.id')
              .select('qq.quizId', 'quizId')
              .addSelect('MAX(question.updatedAt)', 'updatedAt')
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
        ])
        .addSelect('latest_question.updatedAt', 'lastQuestionsUpdatedAt')
        .where('space_id = :spaceId', { spaceId: spaceId })
        .getRawMany()

    const quizzes = await plainToInstance(ReadPlainQuizDto, rawQuizzes);
    return quizzes
  }
}