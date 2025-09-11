import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';

import { IDuplicateQuestionQuizService } from '../interfaces/services/duplicate-question.quiz.service.interface';
import { DuplicateQuestionQuizDto } from '../dto/duplicate-question.quiz.dto';
import { Explanation, Question } from 'src/modules/question/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import { App } from 'src/modules/app/domain';
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';
import { QuestionImage } from 'src/modules/question_image/domain/question_images.entity';

import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { ISyncQuestionImageService } from 'src/modules/question_image/interfaces/services/sync.question_image.service.interface';
import * as cheerio from 'cheerio';

@Injectable()
export class DuplicateQuestionQuizService implements IDuplicateQuestionQuizService{

  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,    
    @InjectRepository(App)
    private readonly appRepo: Repository<App>,
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
    private syncImagesService: ISyncQuestionImageService
  ) {}

  async execute (duplicateQuestionDto: DuplicateQuestionQuizDto) {
    console.log("🚀 ~ DuplicateQuestionQuizService ~ execute ~ duplicateQuestionDto:", duplicateQuestionDto)
    
    const originalQuestion = await this.questionRepo.findOne({
      where: { id: duplicateQuestionDto.questionId },
      relations: [
        'apps', 
        'explanations', 
        'questionTranslations', 
        'images',
        'explanations.explanationTranslations'
      ],
    });

    if (!originalQuestion) {
      throw new Error('Question not found');
    }

    const newQuestion = new Question();
    newQuestion.name = `Copy ${originalQuestion.name}`;
    newQuestion.content = originalQuestion.content;
    newQuestion.isPhising = originalQuestion.isPhising;
    newQuestion.languageId = originalQuestion.languageId;
    newQuestion.type = originalQuestion.type;
    newQuestion.apps = originalQuestion.apps;

    const savedQuestion = await this.questionRepo.save(newQuestion);

    for (const translation of originalQuestion.questionTranslations) {
      const newTranslation = new QuestionTranslation();
      newTranslation.content = translation.content;
      newTranslation.question = savedQuestion;
      newTranslation.languageId = translation.languageId;
      await this.questionTranslationRepo.save(newTranslation);
    }

    for (const explanation of originalQuestion.explanations) {
      const newExplanation = new Explanation();
      newExplanation.position = explanation.position;
      newExplanation.index = explanation.index;
      newExplanation.text = explanation.text;
      newExplanation.question = savedQuestion;
      
      const savedExplanation = await this.explanationRepo.save(newExplanation);
      
      for (const explanationTranslation of explanation.explanationTranslations) {
        const newExplanationTranslation = new ExplanationTranslation();
        newExplanationTranslation.content = explanationTranslation.content;
        newExplanationTranslation.explanation = savedExplanation;
        newExplanationTranslation.languageId = explanationTranslation.languageId;
        await this.explanationTranslationRepo.save(newExplanationTranslation);
      }
    }

    const imageIds = this.getImageIds(originalQuestion.questionTranslations[0]?.content || '');
    if (imageIds.length > 0) {
      const newImageIds = [];
      for (const originalImage of originalQuestion.images) {
        const newImage = new QuestionImage();
        newImage.name = originalImage.name;
        newImage.relativePath = originalImage.relativePath;
        newImage.question = savedQuestion;
        newImage.quizId = duplicateQuestionDto.quizId;
        
        const savedImage = await this.questionImageRepo.save(newImage);
        newImageIds.push(savedImage.id);
      }

      await this.syncImagesService.execute({
        imageIds: newImageIds,
        questionId: savedQuestion.id,
        quizId: duplicateQuestionDto.quizId
      });
    }

    const position = await this.quizQuestionRepo
      .count({ where: { quizId: duplicateQuestionDto.quizId } });

    const quizQuestion = this.quizQuestionRepo.create({
      position: position + 1,
      quizId: duplicateQuestionDto.quizId,
      questionId: savedQuestion.id
    });
    await this.quizQuestionRepo.save(quizQuestion);
  }

  private getImageIds = (content: string) => {
    const sanitizedContent = QuestionSanitizer.sanitizeQuestionContent(content);
    const $ = cheerio.load(sanitizedContent);  
    const data = $.extract({
      imageIds: [
        {
          selector: 'img',
          value: 'data-image-id',
        }
      ],
    })

    return data.imageIds
  }
}