import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { QuizItem } from '../domain/quiz_items.entity';
import { IListQuizService } from '../interfaces/services/list.quiz.service.interface';
import { plainToInstance } from 'class-transformer';
import { Question } from 'src/modules/question/domain';
import { Note } from '../../note/domain';
import { ReadPlainQuizDto } from '../dto/read-plain.quiz.dto';

@Injectable()
export class ListQuizService implements IListQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) { }

  async execute(spaceId: number, descOrder = false): Promise<ReadPlainQuizDto[]> {

    const quizzes = await this.quizRepo
      .createQueryBuilder('quiz')
      .leftJoin(
        qb => {
          return qb
            .from(Question, 'question')
            .innerJoin(QuizItem, 'qi', "qi.entityId = question.id AND qi.entityType = 'question'")
            .select('qi.quizId', 'quizId')
            .addSelect('MAX(question.updatedAt)', 'updatedAt')
            .groupBy('qi.quizId')
        },
        'latest_question',
        'latest_question.quizId = quiz.id'
      )
      .leftJoin(
        qb => {
          return qb
            .from(Note, 'note')
            .innerJoin(QuizItem, 'qi', "qi.entityId = note.id AND qi.entityType = 'note'")
            .select('qi.quizId', 'quizId')
            .addSelect('MAX(note.updatedAt)', 'updatedAt')
            .groupBy('qi.quizId')
        },
        'latest_note',
        'latest_note.quizId = quiz.id'
      )
      .leftJoin(
        qb => {
          return qb
            .from(QuizItem, 'quizItem')
            .select('quizItem.quizId', 'quizId')
            .addSelect('MAX(quizItem.updatedAt)', 'updatedAt')
            .groupBy('quizItem.quizId')
        },
        'latest_quiz_item',
        'latest_quiz_item.quizId = quiz.id'
      )
      .select([
        'quiz.id AS id',
        'quiz.updatedAt AS updatedAt',
        'quiz.title AS title',
        'quiz.hash AS hash',
        'quiz.published AS published',
        'quiz.visibility AS visibility',
        `(SELECT COUNT(*) FROM quiz_items qq_count WHERE qq_count.quiz_id = quiz.id AND qq_count.entity_type = 'question') AS questionsCount`,
        `EXISTS(
          SELECT 1 FROM quiz_runs qr
          WHERE qr.quiz_id = quiz.id AND qr.finished_at IS NOT NULL
        ) AS hasResults`,
      ])
      .addSelect(`GREATEST
        (
          quiz.updated_at,
          COALESCE(latest_question.updatedAt, '1900-01-01'),
          COALESCE(latest_note.updatedAt, '1900-01-01'),
          COALESCE(latest_quiz_item.updatedAt, '1900-01-01')
        )`, 'latestGlobalUpdate')
      .where('space_id = :spaceId', { spaceId: spaceId })
      .orderBy('quiz.created_at', descOrder ? 'DESC' : 'ASC')
      .getRawMany()

    return plainToInstance(ReadPlainQuizDto, quizzes);
  }
}
