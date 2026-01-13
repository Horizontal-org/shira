import { Controller, Get, Inject, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../domain';
import { Language } from 'src/modules/languages/domain';
import { IGenerateUrlsQuestionImageService } from 'src/modules/question_image/interfaces/services/generate_urls.question_image.service.interface';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question')
export class ListQuestionController {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @Inject(TYPES_QUESTION_IMAGE.services.IGenerateUrlsQuestionImageService)
    private getImageUrls: IGenerateUrlsQuestionImageService
  ) {}

  @Get('')
  @Roles(Role.SuperAdmin)
  async handler() {
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
      


    const parsedQuestions = questions.map((question) => ({
      id: question.id,
      name: question.name,
      content: question.questionTranslations[0].content,
      isPhising: question.isPhising,
      fieldOfWorkId: question.fieldsOfWork.length > 0 ? question.fieldsOfWork[0].id : null,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));

    return parsedQuestions;
  }

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  async getQuestion(@Param('id') id: string, @Query('lang') lang: string) {
    // find language by code
    const { id: languageId } = await this.languageRepository.findOne({
      where: { code: lang || 'en' },
    });
    const query = this.questionRepository
      .createQueryBuilder('question')
      .leftJoin('question.apps', 'apps')
      .leftJoin('question.explanations', 'explanations')
      .leftJoin('question.questionTranslations', 'questionTranslations')
      .leftJoin('question.fieldsOfWork', 'fieldsOfWork')
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
        // 'question.fieldOfWorkId',
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
      .andWhere('questionTranslations.languageId = :languageId', {
        languageId,
      });

    const res = (await query.getMany()).shift();

    console.log(res);

    if (!res) return null;

    
    const parsedQuestion = {
      ...res,
      content: res.questionTranslations[0].content,
      explanations: res.explanations.map((explanation) => ({
        ...explanation,
        text: explanation.explanationTranslations[0]?.content,
      })),
      images: await this.getImageUrls.byQuestion(res.id)
    };
    return parsedQuestion;
  }
}
