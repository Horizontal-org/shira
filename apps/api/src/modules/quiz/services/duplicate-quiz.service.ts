import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Quiz } from '../domain/quiz.entity';
import { QuizQuestion } from '../domain/quizzes_questions.entity';
import { IDuplicateQuizService } from '../interfaces/services/duplicate-quiz.service.interface';
import { DuplicateQuizDto } from '../dto/duplicate-quiz.dto';
import { Explanation, Question } from 'src/modules/question/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import { QuestionImage } from 'src/modules/question_image/domain/question_images.entity';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { ISyncQuestionImageService } from 'src/modules/question_image/interfaces/services/sync.question_image.service.interface';
import * as crypto from 'crypto';

@Injectable()
export class DuplicateQuizService implements IDuplicateQuizService {

  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepo: Repository<QuizQuestion>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(Explanation)
    private readonly explanationRepo: Repository<Explanation>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepo: Repository<QuestionTranslation>,
    @InjectRepository(ExplanationTranslation)
    private readonly explanationTranslationRepo: Repository<ExplanationTranslation>,
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
    @InjectRepository(QuestionImage)
    private readonly questionImageRepo: Repository<QuestionImage>,
    @Inject(TYPES_QUESTION_IMAGE.services.ISyncQuestionImageService)
    private syncImagesService: ISyncQuestionImageService,
    private dataSource: DataSource
  ) {}

  async execute(duplicateQuizDto: DuplicateQuizDto): Promise<Quiz> {
    console.log("🚀 ~ DuplicateQuizService ~ execute ~ duplicateQuizDto:", duplicateQuizDto);

    return this.dataSource.transaction(async manager => {
      
      const originalQuiz = await manager.findOne(Quiz, {
        where: { id: duplicateQuizDto.quizId },
        relations: [
          'space',
          'quizQuestions',
          'quizQuestions.question',
          'quizQuestions.question.apps',
          'quizQuestions.question.explanations',
          'quizQuestions.question.questionTranslations',
          'quizQuestions.question.images',
          'quizQuestions.question.explanations.explanationTranslations'
        ],
      });

      if (!originalQuiz) {
        throw new Error('Quiz not found');
      }

      const newQuiz = manager.create(Quiz, {
        title: duplicateQuizDto.title,
        published: false, // Always unpublished by default
        hash: crypto.randomBytes(20).toString('hex'),
        space: originalQuiz.space // Same space as original
      });

      const savedQuiz = await manager.save(Quiz, newQuiz);

      const defaultLanguage = await manager.findOne(Language, { where: { code: 'en' } });
      if (!defaultLanguage) {
        throw new Error('Default language not found');
      }

      for (const originalQuizQuestion of originalQuiz.quizQuestions) {
        const originalQuestion = originalQuizQuestion.question;

        const newQuestion = manager.create(Question, {
          name: originalQuestion.name,
          content: originalQuestion.content,
          isPhising: originalQuestion.isPhising,
          languageId: originalQuestion.languageId || defaultLanguage.id,
          type: originalQuestion.type,
          apps: originalQuestion.apps
        });

        const savedQuestion = await manager.save(Question, newQuestion);

        for (const translation of originalQuestion.questionTranslations) {
          const newTranslation = manager.create(QuestionTranslation, {
            content: translation.content,
            question: savedQuestion,
            languageId: translation.languageId || defaultLanguage.id
          });
          await manager.save(QuestionTranslation, newTranslation);
        }

        for (const explanation of originalQuestion.explanations) {
          const newExplanation = manager.create(Explanation, {
            position: explanation.position,
            index: explanation.index,
            text: explanation.text,
            question: savedQuestion
          });
          
          const savedExplanation = await manager.save(Explanation, newExplanation);
          
          for (const explanationTranslation of explanation.explanationTranslations) {
            const newExplanationTranslation = manager.create(ExplanationTranslation, {
              content: explanationTranslation.content,
              explanation: savedExplanation,
              languageId: explanationTranslation.languageId || defaultLanguage.id
            });
            await manager.save(ExplanationTranslation, newExplanationTranslation);
          }
        }

        const newImageIds = [];
        for (const originalImage of originalQuestion.images) {
          const newImage = manager.create(QuestionImage, {
            name: originalImage.name,
            relativePath: originalImage.relativePath,
            question: savedQuestion,
            quiz: savedQuiz
          });
          
          const savedImage = await manager.save(QuestionImage, newImage);
          newImageIds.push(savedImage.id);
        }

        if (newImageIds.length > 0) {
          await this.syncImagesService.execute({
            imageIds: newImageIds,
            questionId: savedQuestion.id,
            quizId: savedQuiz.id
          });
        }

        const newQuizQuestion = manager.create(QuizQuestion, {
          position: originalQuizQuestion.position,
          quiz: savedQuiz,
          question: savedQuestion
        });
        
        await manager.save(QuizQuestion, newQuizQuestion);
      }

      return savedQuiz;
    });
  }

}