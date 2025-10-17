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
    const questions = await this.questionRepo
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.apps', 'apps')
      .leftJoinAndSelect('q.questionTranslations', 'qt')
      .leftJoinAndMapOne('qt.language', Language, 'lang', 'lang.id = qt.languageId')
      .leftJoinAndSelect('q.explanations', 'exp')
      .leftJoinAndSelect('exp.explanationTranslations', 'et', 'et.languageId = qt.languageId')
      .leftJoinAndMapOne('et.language', Language, 'expLang', 'expLang.id = et.languageId')
      .where('q.type = :type', { type: 'demo' })
      .andWhere('qt.content IS NOT NULL')
      .orderBy('q.name', 'ASC')
      .addOrderBy('exp.index', 'ASC')
      .getMany();

    return questions.map(q => {
      const apps = q.apps?.map(app => ({
        id: app.id,
        name: app.name,
      })) || [];

      const languages = q.questionTranslations
        .filter(tr => tr.content)
        .map(tr => {
          const language = (tr as any).language as Language;

          const explanations = q.explanations
            .flatMap(exp =>
              exp.explanationTranslations
                .filter(et => {
                  const expLanguage = (et as any).language as Language;
                  return expLanguage && expLanguage.id === language.id;
                })
                .map(et => ({
                  index: Number(exp.index),
                  position: Number(exp.position),
                  text: et.content,
                }))
            ).sort((a, b) => a.index - b.index || a.position - b.position);

          return {
            id: language.id,
            name: language.name,
            content: tr.content,
            explanations,
          };
        }).sort((a, b) => a.name.localeCompare(b.name));

      return {
        id: q.id,
        name: q.name,
        isPhishing: Boolean(q.isPhising),
        type: q.type,
        app: apps,
        language: languages,
      };
    });
  }

}