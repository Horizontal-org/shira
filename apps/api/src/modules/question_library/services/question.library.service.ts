import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute() {
    const result = await this.questionRepo
      .createQueryBuilder('q')
      .leftJoin('languages', 'l', 'l.id = q.language_id')
      .leftJoin('apps_questions', 'aq', 'aq.question_id = q.id')
      .leftJoin('apps', 'a', 'a.id = aq.app_id')
      .addSelect(['l.name AS language_name', 'a.name AS app_name'])
      .where('q.type = :type', { type: 'demo' });

    const rows = await result.getRawMany();

    const libraryQuestion = rows.map((r) => ({
      id: r.q_id,
      name: r.q_name,
      isPhishing: r.q_is_phising,
      type: r.q_type,
      language: r.language_name,
      appName: r.app_name
    }));

    return libraryQuestion;
  }
}
