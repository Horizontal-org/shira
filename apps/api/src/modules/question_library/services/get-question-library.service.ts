import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetLibraryQuestionService } from '../interfaces/services/get-question-library.service.interface';
import { QuestionLibraryDto } from '../dto/question.library.dto';
import { Question } from 'src/modules/question/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { Explanation } from 'src/modules/question/domain/explanation.entity';
import { App } from 'src/modules/app/domain/app.entity';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(App)
    private readonly appRepo: Repository<App>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepo: Repository<QuestionTranslation>,
    @InjectRepository(Explanation)
    private readonly explanationRepo: Repository<Explanation>,
  ) { }

  async execute(): Promise<QuestionLibraryDto[]> {
    const questionRows = await this.questionRepo
      .createQueryBuilder('q')
      .select([
        'q.id AS questionId',
        'q.name AS questionName',
        'q.type AS questionType',
        'q.isPhising AS questionIsPhishing',
        'q.createdAt AS questionCreatedAt',
      ])
      .where('q.type = :type', { type: 'demo' })
      .orderBy('q.name', 'ASC')
      .getRawMany();

    if (questionRows.length === 0) {
      return [];
    }

    const questions = questionRows.map((row) => this.mapQuestion(row));
    const questionIds = questions.map((question) => question.id);
    const questionsById = new Map(
      questions.map((question) => [question.id, question]),
    );
    const languagesByQuestionId = new Map<
      number,
      Map<number, QuestionLibraryDto['languages'][number]>
    >();

    const [appRows, languageRows, explanationRows] = await Promise.all([
      this.getAppRows(questionIds),
      this.getLanguageRows(questionIds),
      this.getExplanationRows(questionIds),
    ]);

    this.mapAppsToQuestions(appRows, questionsById);
    this.mapLanguagesToQuestions(languageRows, questionsById, languagesByQuestionId);
    this.mapExplanationsToLanguages(explanationRows, languagesByQuestionId);

    return questions.map((question) => ({
      ...question,
      languages: question.languages.sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }

  private mapQuestion(row: any): QuestionLibraryDto {
    return {
      id: row.questionId,
      name: row.questionName,
      isPhishing: Boolean(row.questionIsPhishing),
      type: row.questionType,
      createdAt: row.questionCreatedAt,
      apps: [],
      languages: [],
    };
  }

  private getAppRows(questionIds: number[]) {
    return this.appRepo
      .createQueryBuilder('app')
      .innerJoin(
        'apps_questions',
        'aq',
        'aq.app_id = app.id',
      )
      .select([
        'aq.question_id AS questionId',
        'app.id AS appId',
        'app.name AS appName',
        'app.type AS appType',
      ])
      .where('aq.question_id IN (:...questionIds)', { questionIds })
      .orderBy('app.name', 'ASC')
      .getRawMany();
  }

  private getLanguageRows(questionIds: number[]) {
    return this.questionTranslationRepo
      .createQueryBuilder('qt')
      .innerJoin('qt.languageId', 'lang')
      .select([
        'qt.questionId AS questionId',
        'lang.id AS languageId',
        'lang.name AS languageName',
        'qt.content AS questionContent',
      ])
      .where('qt.questionId IN (:...questionIds)', { questionIds })
      .andWhere('qt.content IS NOT NULL')
      .orderBy('lang.name', 'ASC')
      .getRawMany();
  }

  private getExplanationRows(questionIds: number[]) {
    return this.explanationRepo
      .createQueryBuilder('exp')
      .innerJoin('exp.question', 'q')
      .innerJoin(
        'exp.explanationTranslations',
        'et',
        'et.content IS NOT NULL',
      )
      .innerJoin('et.languageId', 'lang')
      .select([
        'q.id AS questionId',
        'lang.id AS languageId',
        'lang.name AS languageName',
        'exp.index AS explanationIndex',
        'exp.position AS explanationPosition',
        'et.content AS explanationText',
      ])
      .where('q.id IN (:...questionIds)', { questionIds })
      .orderBy('exp.index', 'ASC')
      .addOrderBy('exp.position', 'ASC')
      .getRawMany();
  }

  private mapAppsToQuestions(appRows: any[], questionsById: Map<number, QuestionLibraryDto>) {
    for (const row of appRows) {
      const questionId = row.questionId;
      const appId = row.appId;
      const question = questionsById.get(questionId);

      if (!question || !appId) {
        continue;
      }

      const alreadyAdded = question.apps.some((app) => app.id === appId);

      if (alreadyAdded) {
        continue;
      }

      question.apps.push({
        id: appId,
        name: row.appName ?? '',
        type: row.appType ?? undefined,
      });
    }
  }

  private mapLanguagesToQuestions(
    languageRows: any[],
    questionsById: Map<number, QuestionLibraryDto>,
    languagesByQuestionId: Map<number, Map<number, QuestionLibraryDto['languages'][number]>>,
  ) {
    for (const row of languageRows) {
      const questionId = row.questionId;
      const languageId = row.languageId;
      const question = questionsById.get(questionId);

      if (!question) {
        continue;
      }

      const languagesById =
        languagesByQuestionId.get(questionId) ??
        new Map<number, QuestionLibraryDto['languages'][number]>();

      if (languagesById.has(languageId)) {
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
      languagesByQuestionId.set(questionId, languagesById);
    }
  }

  private mapExplanationsToLanguages(
    explanationRows: any[],
    languagesByQuestionId: Map<number, Map<number, QuestionLibraryDto['languages'][number]>>,
  ) {
    for (const row of explanationRows) {
      const questionId = row.questionId;
      const languageId = row.languageId;
      const language = languagesByQuestionId.get(questionId)?.get(languageId);

      if (!language) {
        continue;
      }

      language.explanations.push({
        index: row.explanationIndex,
        position: row.explanationPosition,
        text: row.explanationText,
      });
    }
  }
}
