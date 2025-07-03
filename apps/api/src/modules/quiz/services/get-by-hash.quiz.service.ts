import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { plainToInstance } from 'class-transformer';
import { ReadQuizDto } from '../dto/read.quiz.dto';
import { IGetByHashQuizService } from '../interfaces/services/get-by-hash.quiz.service.interface';
import { Language } from 'src/modules/languages/domain';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { IGenerateUrlsQuestionImageService } from 'src/modules/question_image/interfaces/services/generate_urls.question_image.service.interface';

@Injectable()
export class GetByHashQuizService implements IGetByHashQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @Inject(TYPES_QUESTION_IMAGE.services.IGenerateUrlsQuestionImageService)
    private getImageUrls: IGenerateUrlsQuestionImageService
  ) {}

  async execute (
    hash
  ) {
    const { id: languageId } = await this.languageRepository.findOne({
      where: { code: 'en' },
    });

    // TODO test sanitize for the hash
    const quiz = await this.quizRepo
        .createQueryBuilder('quiz')
        .leftJoin('quiz.quizQuestions', 'quizzes_questions')
        .leftJoin('quizzes_questions.question', 'question')
        .leftJoin('question.questionTranslations', 'questionTranslations')
        .leftJoin('question.apps', 'apps')
        .leftJoin('question.explanations', 'explanations')
        .leftJoin(
          'explanations.explanationTranslations',
          'explanationTranslations',
          'explanations.id = explanationTranslations.explanation_id AND explanationTranslations.language_id = :languageId',
          { languageId },
        )
        .select([
          'quiz.id',
          'question.id',
          'question.name',
          'quiz.title',
          'quizzes_questions.questionId',
          'quizzes_questions.position',
          'question.isPhising',
          'apps.id',
          'apps.name',
          'explanations.id',
          'explanations.index',
          'explanations.position',
          'explanations.createdAt',
          'explanations.updatedAt',
          'questionTranslations.content',
          'explanationTranslations.content',
        ])
        .where('quiz.hash = :hash', { hash: hash })
        .andWhere('published = 1')
        .andWhere('questionTranslations.languageId = :languageId', {
          languageId,
        })
        .getOne()

    if (!quiz) {
      throw new NotFoundException()
    }

    const parsedAll = quiz.quizQuestions.map((qq) => {
      return {
        ...qq,
        question: {
          ...qq.question,
          app: {
            id: qq.question.apps[0].id,
            name: qq.question.apps[0].name,
          },
          explanations: qq.question.explanations.map((explanation) => ({
            ...explanation,
            text: explanation.explanationTranslations[0]?.content,
          })),
          content: qq.question.questionTranslations[0].content
        }
      }
    })
    
    const images = await this.getImageUrls.byQuiz(quiz.id)
    return {
      title: quiz.title,
      images: images,
      quizQuestions: parsedAll.sort((a, b) => a.position - b.position)
    };
  }
}