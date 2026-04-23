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

  private mapQuestion(row: any): QuestionLibraryDto {
    return {
      id: row.questionId,
      name: row.questionName,
      isPhishing: Boolean(row.questionIsPhishing),
      type: row.questionType,
      apps: [],
      languages: [],
    };
  }

  private getAppRows(questionIds: number[]) {
    return this.questionRepo
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
      .getRawMany();
  }

  private getLanguageRows(questionIds: number[]) {
    return this.questionRepo
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
      .getRawMany();
  }

  private getExplanationRows(questionIds: number[]) {
    return this.questionRepo
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