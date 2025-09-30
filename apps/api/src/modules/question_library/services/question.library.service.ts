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
    const result = this.questionRepo
      .createQueryBuilder('q')
      .leftJoin('languages', 'l', 'l.id = q.language_id')
      .leftJoin('apps_questions', 'aq', 'aq.question_id = q.id')
      .leftJoin('apps', 'a', 'a.id = aq.app_id')
      .leftJoin('explanations', 'e', 'e.question_id = q.id')
      .select([
        'q.id AS q_id',
        'q.name AS q_name',
        'q.is_phising AS q_is_phising',
        'q.type AS q_type',
        'q.content AS q_content',
        'l.name AS language_name',
        'a.name AS app_name',
        'e.explanation_position AS explanation_position',
        'e.explanation_text AS explanation_text',
        'e.explanation_index AS explanation_index',
      ])
      .where('q.type = :type', { type: 'demo' })
      .orderBy('q.name', 'ASC');

    const rows = await result.getRawMany();

    // Array of explanations
    const byId = new Map<number, any>();
    for (const r of rows) {
      if (!byId.has(r.q_id)) {
        byId.set(r.q_id, {
          id: r.q_id,
          name: r.q_name,
          isPhishing: r.q_is_phising,
          type: r.q_type,
          content: r.q_content,
          language: r.language_name,
          appName: r.app_name,
          explanations: [] as { position: number; text: string; index: number }[],
        });
      }
      if (r.explanation_index != null) {
        byId.get(r.q_id).explanations.push({
          position: Number(r.explanation_position),
          text: r.explanation_text,
          index: Number(r.explanation_index),
        });
      }
    }

    const libraryQuestions = [...byId.values()].map(q => ({
      ...q,
      explanations: q.explanations.sort((a, b) => a.index - b.index),
    }));

    return libraryQuestions;
  }
}