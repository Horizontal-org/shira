import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';
import { QuestionLibraryDto } from '../dto/question.library.dto';
import { Language } from 'src/modules/languages/domain/languages.entity';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute(): Promise<QuestionLibraryDto[]> {
    const rows = await this.questionRepo
      .createQueryBuilder('q')
      .leftJoin('q.apps', 'app')
      .leftJoin('q.explanations', 'e')
      .leftJoin('q.questionTranslations', 'qt')
      .leftJoin(Language, 'lang', 'lang.id = qt.language_id')
      .leftJoin('e.explanationTranslations', 'et', 'et.language_id = qt.language_id')
      .select([
        'q.id AS q_id',
        'q.name AS q_name',
        'q.isPhising AS q_is_phishing',
        'q.type AS q_type',
        'qt.content AS qt_content',
        'lang.id AS lang_id',
        'lang.name AS lang_name',
        'app.name AS app_name',
        'e.explanation_position AS e_position',
        'et.content AS e_text',
        'e.explanation_index AS e_index',
      ])
      .where('q.type = :type', { type: 'demo' })
      .andWhere('qt.content IS NOT NULL')
      .orderBy('q.name', 'ASC')
      .getRawMany();

    const grouped = new Map<string, QuestionLibraryDto>();

    for (const row of rows) {
      // group by question + app + language
      const key = `${row.q_id}::${row.app_name}::${row.lang_id}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          id: Number(row.q_id),
          name: row.q_name,
          isPhishing: Boolean(row.q_is_phishing),
          type: row.q_type,
          content: row.qt_content,
          language: row.lang_name,
          appName: row.app_name,
          explanations: [],
        });
      }

      // add explanations for current language
      if (row.e_index != null && row.e_text != null) {
        grouped.get(key)!.explanations.push({
          position: Number(row.e_position),
          text: row.e_text,
          index: Number(row.e_index),
        });
      }
    }

    // sort explanations per DTO
    for (const dto of grouped.values()) {
      dto.explanations.sort((a, b) => a.index - b.index);
    }

    return Array.from(grouped.values());
  }
}