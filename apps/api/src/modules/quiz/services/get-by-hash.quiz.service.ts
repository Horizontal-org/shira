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
import { TYPES as TYPES_NOTE_IMAGE } from 'src/modules/note_image/interfaces'
import { IGenerateUrlsNoteImageService } from 'src/modules/note_image/interfaces/services/generate_urls.note_image.service.interface'
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
    @Inject(TYPES_NOTE_IMAGE.services.IGenerateUrlsNoteImageService)
    private getNoteImageUrls: IGenerateUrlsNoteImageService,
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

    const quizItems = await this.quizRepo.manager.getRepository(QuizItem).find({
      where: { quizId: quiz.id },
    });

    const hydratedItems = await this.quizItemsService.hydrate(quizItems, {
      questionRelations: [
        'apps',
        'questionTranslations',
        'explanations',
        'explanations.explanationTranslations',
        'explanations.explanationTranslations.languageId',
      ],
    });
    console.log("🚀 ~ GetByHashQuizService ~ execute ~ hydratedItems:", hydratedItems)

    // `languageId` on QuestionTranslation/ExplanationTranslation is a `@ManyToOne(() => Language)`
    // relation typed as `number` (see questionTranslation.entity.ts) - at runtime it's the eager-loaded
    // Language object, so it must be compared by `.id`, not by direct equality against a numeric id.
    const translationLanguageId = (translation: { languageId: number }) =>
      (translation.languageId as unknown as { id: number })?.id;

    const parsedAll = hydratedItems
      .filter((item) => item.entityType === 'question')
      .filter((qq) => qq.question.questionTranslations?.some((t) => translationLanguageId(t) === languageId))
      .map((qq) => {
        const question = qq.question;
        const questionTranslation = question.questionTranslations.find(
          (t) => translationLanguageId(t) === languageId,
        );

        return {
          position: qq.position,
          entityType: 'question' as const,
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
                (t) => translationLanguageId(t) === languageId,
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

    const parsedNotes = hydratedItems
      .filter((item) => item.entityType === 'note')
      .map((item) => ({
        position: item.position,
        entityType: 'note' as const,
        noteId: item.note.id,
        note: {
          id: item.note.id,
          name: item.note.name,
          content: item.note.content,
        },
      }));

    // ids from question_images and note_images can overlap, consumers must match on type + id
    const [questionImages, noteImages] = await Promise.all([
      this.getImageUrls.byQuiz(quiz.id),
      this.getNoteImageUrls.byQuiz(quiz.id),
    ])
    const images = [
      ...(questionImages as unknown as object[]).map((image) => ({ ...image, type: 'question' as const })),
      ...noteImages.map((image) => ({ ...image, type: 'note' as const })),
    ]

    return {
      id: quiz.id,
      title: quiz.title,
      images: images,
      hasAssessmentEnabled: quiz.assessmentMode,
      hasResultsEnabled: quiz.space?.hasResultsEnabled ?? true,
      quizQuestions: [...parsedAll, ...parsedNotes].sort((a, b) => a.position - b.position)
    };
  }
}
