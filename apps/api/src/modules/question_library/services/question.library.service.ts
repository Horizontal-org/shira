import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';
import { plainToInstance } from 'class-transformer';
import { QuestionLibraryDto } from '../dto/question.library.dto';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute(): Promise<QuestionLibraryDto[]> {
    const rows = await this.questionRepo
      .createQueryBuilder('question')
      .leftJoin('languages', 'language', 'language.id = question.language_id')
      .leftJoin('question.apps', 'apps')
      .select([
        'question.id AS q_id',
        'question.name AS q_name',
        'question.is_phising AS q_is_phising',
        'question.type AS q_type',
        'language.name AS language_name',
        'apps.name AS app_name'
      ])
      .where('question.type = :type', { type: 'demo' })
      .orderBy('question.name', 'ASC')
      .getRawMany();


    const libraryQuestions = plainToInstance(
      QuestionLibraryDto,
      rows.map((r) => ({
        id: r.question_id,
        name: r.q_name,
        isPhishing: r.q_is_phising,
        type: r.question_type,
        language: r.language_name,
        appName: r.app_name,
      })),
    );

    return libraryQuestions;
  }
}
