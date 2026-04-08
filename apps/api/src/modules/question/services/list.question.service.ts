import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from 'src/modules/languages/domain';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces';
import { IGenerateUrlsQuestionImageService } from 'src/modules/question_image/interfaces/services/generate_urls.question_image.service.interface';
import { Question } from '../domain';

@Injectable()
export class ListQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @Inject(TYPES_QUESTION_IMAGE.services.IGenerateUrlsQuestionImageService)
    private readonly getImageUrls: IGenerateUrlsQuestionImageService,
  ) { }

  async getQuestions() {
    const languageId = 1;

    const questions = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoin('question.questionTranslations', 'questionTranslations')
      .leftJoinAndSelect('question.fieldsOfWork', 'fieldsOfWork')
      .select([
        'question.id',
        'question.isPhising',
        'question.name',
        'questionTranslations.content',
        'questionTranslations.languageId',
        'question.createdAt',
        'question.updatedAt',
        'question.type',
        'fieldsOfWork.id'
      ])
      .where('questionTranslations.languageId = :languageId', { languageId })
      .andWhere('question.type = :type', { type: 'demo' })
      .getMany();

    return questions.map((question) => ({
      id: question.id,
      name: question.name,
      content: question.questionTranslations[0].content,
      isPhising: question.isPhising,
      fieldOfWorkId: question.fieldsOfWork.length > 0 ? question.fieldsOfWork[0].id : null,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));
  }

  async getQuestion(spaceId: number, id: string, lang?: string) {
    const language = await this.languageRepository.findOne({
      where: { code: lang || 'en' },
    });

    const languageId = language?.id ?? 1;

    const query = this.questionRepository
      .createQueryBuilder('question')
      .leftJoin('question.apps', 'apps')
      .leftJoin('question.explanations', 'explanations')
      .leftJoin('question.questionTranslations', 'questionTranslations')
      .leftJoin('question.fieldsOfWork', 'fieldsOfWork')
      .leftJoin('question.quizQuestions', 'quizQuestions')
      .leftJoin('quizQuestions.quiz', 'quiz')
      .leftJoin(
        'explanations.explanationTranslations',
        'explanationTranslations',
        'explanations.id = explanationTranslations.explanation_id AND explanationTranslations.language_id = :languageId',
        { languageId },
      )
      .select([
        'question.id',
        'question.name',
        'question.isPhising',
        'apps',
        'explanations.id',
        'explanations.index',
        'explanations.position',
        'explanations.createdAt',
        'explanations.updatedAt',
        'questionTranslations.content',
        'explanationTranslations.content',
        'fieldsOfWork.id',
      ])
      .where('question.id = :id', { id })
      .andWhere('questionTranslations.languageId = :languageId', { languageId })
      .andWhere('quiz.space_id = :spaceId)', { spaceId });

    const res = (await query.getMany()).shift();

    if (!res) return null;

    return {
      ...res,
      content: res.questionTranslations[0].content,
      explanations: res.explanations.map((explanation) => ({
        ...explanation,
        text: explanation.explanationTranslations[0]?.content,
      })),
      images: await this.getImageUrls.byQuestion(res.id),
    };
  }
}
