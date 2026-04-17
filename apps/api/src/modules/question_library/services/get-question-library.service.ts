import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/get-question-library.service.interface';
import { QuestionLibraryDto } from '../dto/question.library.dto';
import { Language } from 'src/modules/languages/domain/languages.entity';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute(): Promise<QuestionLibraryDto[]> {
    const questionRows = await this.questionRepo
      .createQueryBuilder('q')
      .select([
        'q.id AS questionId',
        'q.name AS questionName',
        'q.type AS questionType',
        'q.isPhising AS questionIsPhishing',
      ])
      .where('q.type = :type', { type: 'demo' })
      .orderBy('q.name', 'ASC')
      .getRawMany();

    if (questionRows.length === 0) {
      return [];
    }

    const questionIds = questionRows.map(({ questionId }) => Number(questionId));
    const questions: QuestionLibraryDto[] = questionRows.map((row) => ({
      id: Number(row.questionId),
      name: row.questionName,
      isPhishing: Boolean(Number(row.questionIsPhishing)),
      type: row.questionType,
      apps: [],
      languages: [],
    }));

    const questionMap = new Map<number, QuestionLibraryDto>(
      questions.map((question) => [question.id, question]),
    );
    const questionAppIds = new Map<number, Set<number>>();
    const questionLanguages = new Map<
      number,
      Map<number, QuestionLibraryDto['languages'][number]>
    >();

    const [appRows, languageRows, explanationRows] = await Promise.all([
      this.questionRepo
        .createQueryBuilder('q')
        .leftJoin('q.apps', 'app')
        .select([
          'q.id AS questionId',
          'app.id AS appId',
          'app.name AS appName',
          'app.type AS appType',
        ])
        .where('q.id IN (:...questionIds)', { questionIds })
        .andWhere('app.id IS NOT NULL')
        .orderBy('app.name', 'ASC')
        .getRawMany(),

      this.questionRepo
        .createQueryBuilder('q')
        .innerJoin('q.questionTranslations', 'qt', 'qt.content IS NOT NULL')
        .innerJoin(Language, 'lang', 'lang.id = qt.languageId')
        .select([
          'q.id AS questionId',
          'lang.id AS languageId',
          'lang.name AS languageName',
          'qt.content AS questionContent',
        ])
        .where('q.id IN (:...questionIds)', { questionIds })
        .orderBy('lang.name', 'ASC')
        .getRawMany(),
        
      this.questionRepo
        .createQueryBuilder('q')
        .innerJoin('q.explanations', 'exp')
        .innerJoin('exp.explanationTranslations', 'et', 'et.content IS NOT NULL')
        .innerJoin(Language, 'lang', 'lang.id = et.languageId')
        .select([
          'q.id AS questionId',
          'lang.id AS languageId',
          'exp.index AS explanationIndex',
          'exp.position AS explanationPosition',
          'et.content AS explanationText',
        ])
        .where('q.id IN (:...questionIds)', { questionIds })
        .orderBy('exp.index', 'ASC')
        .addOrderBy('exp.position', 'ASC')
        .getRawMany(),
    ]);

    for (const row of appRows) {
      if (!row.appId) {
        continue;
      }

      const question = questionMap.get(Number(row.questionId));
      const appId = Number(row.appId);
      const appIds = questionAppIds.get(Number(row.questionId)) ?? new Set<number>();

      if (!question || appIds.has(appId)) {
        continue;
      }

      question.apps.push({
        id: appId,
        name: row.appName ?? '',
        type: row.appType ?? undefined,
      });
      appIds.add(appId);
      questionAppIds.set(question.id, appIds);
    }

    for (const row of languageRows) {
      const question = questionMap.get(Number(row.questionId));
      const languageId = Number(row.languageId);
      const languagesById = questionLanguages.get(Number(row.questionId)) ?? new Map();

      if (!question || languagesById.has(languageId)) {
        continue;
      }

      const language = {
        id: languageId,
        name: row.languageName,
        content: row.questionContent,
        explanations: [],
      };

      question.languages.push(language);
      languagesById.set(languageId, language);
      questionLanguages.set(question.id, languagesById);
    }

    for (const row of explanationRows) {
      const language = questionLanguages
        .get(Number(row.questionId))
        ?.get(Number(row.languageId));

      if (!language) {
        continue;
      }

      language.explanations.push({
        index: Number(row.explanationIndex),
        position: Number(row.explanationPosition),
        text: row.explanationText,
      });
    }

    return questions.map((question) => ({
      ...question,
      languages: question.languages
        .map((language) => ({
          ...language,
          explanations: language.explanations.sort(
            (a, b) => a.index - b.index || a.position - b.position,
          ),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }

}
