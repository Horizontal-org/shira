import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { QuizItem } from '../domain/quiz_items.entity';
import { IGetByHashQuizService } from '../interfaces/services/get-by-hash.quiz.service.interface';
import { Language } from 'src/modules/languages/domain';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { IGenerateUrlsQuestionImageService } from 'src/modules/question_image/interfaces/services/generate_urls.question_image.service.interface';
import { TYPES } from '../interfaces';
import { IQuizItemsService } from '../interfaces/services/quiz-items.service.interface';

@Injectable()
export class GetByHashQuizService implements IGetByHashQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @Inject(TYPES_QUESTION_IMAGE.services.IGenerateUrlsQuestionImageService)
    private getImageUrls: IGenerateUrlsQuestionImageService,
    @Inject(TYPES.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) { }

  async execute(
    hash,
    visibility = 'public'
  ) {
    const { id: languageId } = await this.languageRepository.findOne({
      where: { code: 'en' },
    });

    const quiz = await this.quizRepo
      .createQueryBuilder('quiz')
      .leftJoin('quiz.space', 'space')
      .select([
        'quiz.id',
        'quiz.title',
        'quiz.visibility',
        'quiz.assessmentMode',
        'space.hasResultsEnabled',
      ])
      .where('quiz.hash = :hash', { hash: hash })
      .andWhere('published = 1')
      .andWhere('quiz.visibility = :visibility', { visibility: visibility })
      .getOne()

    if (!quiz) {
      throw new NotFoundException()
    }

    // Notes are excluded from the public quiz-taking payload - the learner-facing app
    // doesn't yet know how to render a non-question item.
    const quizItems = await this.quizRepo.manager.getRepository(QuizItem).find({
      where: { quizId: quiz.id, entityType: 'question' },
    });

    const hydratedItems = await this.quizItemsService.hydrate(quizItems, {
      questionRelations: ['apps', 'questionTranslations', 'explanations', 'explanations.explanationTranslations'],
    });

    const parsedAll = hydratedItems
      .filter((item) => item.entityType === 'question')
      .filter((qq) => qq.question.questionTranslations?.some((t) => t.languageId === languageId))
      .map((qq) => {
        const question = qq.question;
        const questionTranslation = question.questionTranslations.find(
          (t) => t.languageId === languageId,
        );

        return {
          position: qq.position,
          questionId: question.id,
          question: {
            id: question.id,
            name: question.name,
            isPhising: question.isPhising,
            app: {
              id: question.apps[0].id,
              name: question.apps[0].name,
            },
            explanations: (question.explanations ?? []).map((explanation) => {
              const explanationTranslation = explanation.explanationTranslations?.find(
                (t) => t.languageId === languageId,
              );
              return {
                id: explanation.id,
                index: explanation.index,
                position: explanation.position,
                createdAt: explanation.createdAt,
                updatedAt: explanation.updatedAt,
                text: explanationTranslation?.content,
              };
            }),
            content: questionTranslation?.content,
          },
        };
      });

    const images = await this.getImageUrls.byQuiz(quiz.id)
    return {
      id: quiz.id,
      title: quiz.title,
      images: images,
      hasAssessmentEnabled: quiz.assessmentMode,
      hasResultsEnabled: quiz.space?.hasResultsEnabled ?? true,
      quizQuestions: parsedAll.sort((a, b) => a.position - b.position)
    };
  }
}
