import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/get-question-library.service.interface';
import { QuestionLibraryDto } from '../dto/question.library.dto';
import { Language as LangEntity } from 'src/modules/languages/domain/languages.entity';
import { App } from '../dto/app.dto';

type RawRow = {
  q_id: number;
  q_name: string;
  q_is_phishing: number | boolean | null; // viene de isPhising en DB
  q_type: string;
  app_id: number | null;
  app_name: string | null;
  app_type: string | null;
  lang_id: number;
  lang_name: string;
  qt_content: string | null;
  e_position: string | number | null;
  e_text: string | null;
  e_index: string | number | null;
};

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  async execute(): Promise<QuestionLibraryDto[]> {
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

    const byQuestion = new Map<number, QuestionLibraryDto>();
    const seenExplanation = new Map<string, Set<string>>();

    for (const r of rows) {
      const qId = r.q_id;
      const langId = r.lang_id;

      if (!byQuestion.has(qId)) {
        byQuestion.set(qId, {
          id: qId,
          name: r.q_name,
          isPhishing: !!r.q_is_phishing,
          type: r.q_type,
          app: undefined as App,
          language: [],
        });
      }

      const dto = byQuestion.get(qId)!;

      if (!dto.app && r.app_id != null) {
        dto.app = {
          id: Number(r.app_id),
          name: r.app_name ?? '',
          type: r.app_type ?? undefined,
        };
      }

      let langEntry = dto.language.find((l) => l.id === langId);
      if (!langEntry) {
        langEntry = {
          id: langId,
          name: r.lang_name,
          content: r.qt_content ?? '',
          explanations: [],
        };
        dto.language.push(langEntry);
      } else {
        if (!langEntry.content && r.qt_content) {
          langEntry.content = r.qt_content;
        }
      }

      const rootKey = `${qId}::${langId}`;
      if (!seenExplanation.has(rootKey)) seenExplanation.set(rootKey, new Set());

      if (r.e_index != null && r.e_text != null) {
        const idx = Number(r.e_index);
        const pos = Number(r.e_position ?? 0);
        const ek = `${idx}::${r.e_text}`;
        if (!seenExplanation.get(rootKey)!.has(ek)) {
          langEntry.explanations.push({
            index: Number.isNaN(idx) ? 0 : idx,
            position: Number.isNaN(pos) ? 0 : pos,
            text: r.e_text,
          });
          seenExplanation.get(rootKey)!.add(ek);
        }
      }
    }

    for (const dto of byQuestion.values()) {
      dto.language.sort((a, b) => a.name.localeCompare(b.name));
      for (const l of dto.language) {
        l.explanations.sort((a, b) => a.index - b.index);
      }
      if (!dto.app) {
        dto.app = { name: '' };
      }
    }

    return Array.from(byQuestion.values());
  }
}
