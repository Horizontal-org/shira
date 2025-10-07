import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';
import { plainToInstance } from 'class-transformer';
import { QuestionLibraryDto } from '../dto/question.library.dto';
import { contents } from 'cheerio/dist/commonjs/api/traversing';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute(): Promise<QuestionLibraryDto[]> {
    const rows = await this.questionRepo
      .createQueryBuilder('q')
      .leftJoin('languages', 'l', 'l.id = q.language_id')
      .leftJoin('q.apps', 'a')
      .leftJoin('q.explanations', 'e')
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
      .orderBy('q.name', 'ASC')
      .getRawMany();

    const byId = new Map<number, QuestionLibraryDto & { explanations: { position: number; text: string; index: number }[] }>();
    for (const r of rows as any[]) {
      const id: number = r.q_id;

      if (!byId.has(id)) {
        byId.set(
          id,
          plainToInstance(QuestionLibraryDto, {
            id,
            name: r.q_name,
            isPhishing: Boolean(r.q_is_phising),
            type: r.q_type,
            content: r.q_content,
            language: r.language_name,
            appName: r.app_name,
            explanations: [],
          }) as any,
        );
      }

      if (r.explanation_index != null) {
        const question = byId.get(id)!;
        question.explanations.push({
          position: Number(r.explanation_position),
          text: r.explanation_text,
          index: Number(r.explanation_index),
        });
      }
    }

    const libraryQuestions = Array.from(byId.values()).map((question) => ({
      ...question,
      explanations: question.explanations.sort((a, b) => a.index - b.index),
    }));
    return libraryQuestions as QuestionLibraryDto[];
  }
}