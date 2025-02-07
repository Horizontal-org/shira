import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../domain';
import { Language } from 'src/modules/languages/domain';

@Controller('question')
export class ListQuestionController {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  @Get('')
  async handler() {
    const languageId = 1;
    const questions = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoin('question.questionTranslations', 'questionTranslations')
      .select([
        'question.id',
        'question.fieldOfWorkId',
        'question.isPhising',
        'question.name',
        'questionTranslations.content',
        'questionTranslations.languageId',
        'question.createdAt',
        'question.updatedAt',
      ])
      .where('questionTranslations.languageId = :languageId', { languageId })
      .getMany();

    const parsedQuestions = questions.map((question) => ({
      id: question.id,
      name: question.name,
      content: question.questionTranslations[0].content,
      isPhising: question.isPhising,
      fieldOfWorkId: question.fieldOfWorkId,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));

    return parsedQuestions;
  }

  @Get(':id')
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
        'question.fieldOfWorkId',
        'apps',
        'explanations.id',
        'explanations.index',
        'explanations.position',
        'explanations.createdAt',
        'explanations.updatedAt',
        'questionTranslations.content',
        'explanationTranslations.content',
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
    };
    return parsedQuestion;
  }
}
