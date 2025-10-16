import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/get-question-library.service.interface';
import { QuestionLibraryDto } from '../dto/question.library.dto';
import { Language as LangEntity } from 'src/modules/languages/domain/languages.entity';
import { App } from '../dto/app.dto';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute(): Promise<QuestionLibraryDto[]> {
    type RawRow = {
      q_id: number;
      q_name: string;
      q_is_phishing: number;
      q_type: string;
      app_id: number;
      app_name: string;
      app_type: string;
      lang_id: number;
      lang_name: string;
      qt_content: string | null;
      e_position: string | number | null;
      e_text: string | null;
      e_index: string | number | null;
    };

    const rows: RawRow[] = await this.questionRepo
      .createQueryBuilder('q')
      .leftJoin('q.apps', 'app')
      .leftJoin('q.explanations', 'exp')
      .leftJoin('q.questionTranslations', 'qt')
      .leftJoin(LangEntity, 'lang', 'lang.id = qt.language_id')
      .leftJoin('exp.explanationTranslations', 'et', 'et.language_id = qt.language_id')
      .select([
        'q.id AS q_id',
        'q.name AS q_name',
        'q.isPhising AS q_is_phishing', // alias para exponer como isPhishing
        'q.type AS q_type',
        'app.id AS app_id',
        'app.name AS app_name',
        'app.type AS app_type',
        'lang.id AS lang_id',
        'lang.name AS lang_name',
        'qt.content AS qt_content',
        'exp.explanation_position AS e_position',
        'et.content AS e_text',
        'exp.explanation_index AS e_index',
      ])
      .where('q.type = :type', { type: 'demo' })
      .andWhere('qt.content IS NOT NULL')
      .orderBy('q.name', 'ASC')
      .addOrderBy('app.name', 'ASC')
      .addOrderBy('lang.name', 'ASC')
      .addOrderBy('exp.explanation_index', 'ASC')
      .getRawMany();

    const questionsById = new Map<number, QuestionLibraryDto>();
    const explanationsSeen = new Map<string, Set<string>>(); // key: `${qId}::${langId}`

    const ensureSet = (key: string) => {
      let set = explanationsSeen.get(key);
      if (!set) {
        set = new Set<string>();
        explanationsSeen.set(key, set);
      }
      return set;
    };

    for (const row of rows) {
      const questionId = row.q_id;
      const languageId = row.lang_id;

      // Question
      if (!questionsById.has(questionId)) {
        questionsById.set(questionId, {
          id: questionId,
          name: row.q_name,
          isPhishing: Boolean(row.q_is_phishing),
          type: row.q_type,
          app: undefined as App,
          language: [],
        });
      }
      const dto = questionsById.get(questionId)!;

      // App first one available
      if (!dto.app && row.app_id != null) {
        dto.app = {
          id: Number(row.app_id),
          name: row.app_name,
          type: row.app_type,
        };
      }

      // Language
      let lang = dto.language.find((l) => l.id === languageId);
      if (!lang) {
        lang = {
          id: languageId,
          name: row.lang_name,
          content: row.qt_content ?? '',
          explanations: [],
        };
        dto.language.push(lang);
      } else if (!lang.content && row.qt_content) {
        lang.content = row.qt_content;
      }

      // Explanations
      const rootKey = `${questionId}::${languageId}`;
      const seen = ensureSet(rootKey);

      if (row.e_index != null && row.e_text != null) {
        const index = Number(row.e_index);
        const position = Number(row.e_position);
        const key = `${index}::${row.e_text}`;

        if (!seen.has(key)) {
          lang.explanations.push({ index, position, text: row.e_text });
          seen.add(key);
        }
      }
    }

    for (const dto of questionsById.values()) {
      dto.language.sort((a, b) => a.name.localeCompare(b.name));
      for (const l of dto.language) {
        l.explanations.sort((a, b) => a.index - b.index || a.position - b.position);
      }
    }

    return Array.from(questionsById.values());
  }
}