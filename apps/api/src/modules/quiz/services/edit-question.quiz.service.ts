import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';

import { ICreateQuestionQuizService } from '../interfaces/services/create-question.quiz.service.interface';
import { CreateQuestionQuizDto } from '../../quiz_result/dto/create-question.quiz.dto';
import { Explanation, Question } from 'src/modules/question/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import { App } from 'src/modules/app/domain';
import { EditQuestionQuizDto } from '../dto/edit-question.quiz.dto';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { ISyncQuestionImageService } from 'src/modules/question_image/interfaces/services/sync.question_image.service.interface';
import * as cheerio from 'cheerio';

@Injectable()
export class EditQuestionQuizService implements ICreateQuestionQuizService{

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
    @Inject(TYPES_QUESTION_IMAGE.services.ISyncQuestionImageService)
    private syncImagesService: ISyncQuestionImageService
  ) {}

  async execute (editQuestionDto: EditQuestionQuizDto) {
    
    let question = await this.questionRepo.findOne({
      where: { id: editQuestionDto.questionId },
    })
          
    if (!question) {
      throw new NotFoundException()
    }

    const app = await this.appRepo.findOne({
      where: { id: editQuestionDto.question.app },
    })

    const language = await this.languageRepo.findOne({
      where: { code: 'en' },
    })
    
    question.name = editQuestionDto.question.name;
    question.isPhising = editQuestionDto.question.isPhishing ? 1 : 0;
    question.apps = [app];
    question.languageId = language.id;
    question.content = '';
    question.type = 'quiz'
    question.updatedAt = new Date()

    await this.questionRepo.save(question);

    //SYNC IMAGES HERE
    const imageIds = this.getImageIds(editQuestionDto.question.content)
    await this.syncImagesService.execute({
      imageIds: imageIds,
      questionId: question.id,
      quizId: editQuestionDto.quizId
    })

    //CREATE QUESTION_TRANSLATION WITH DEFAULT ON ENGLISH
    const questionTranslation = await this.questionTranslationRepo.findOne({
      where: { questionId: question.id }
    })

    const originalContent = editQuestionDto.question.content;
    const sanitizedContent = QuestionSanitizer.sanitizeQuestionContent(originalContent);

    questionTranslation.content = sanitizedContent;
    questionTranslation.question = question;
    questionTranslation.languageId = language.id;
    await this.questionTranslationRepo.save(questionTranslation);
    

    //DELETE PREVIOUS EXPLANATIONS
    await this.explanationRepo.delete({ 'question': question })

    //ON LOOP
    //--CREATE EXPLANATION
    //--<-RETURN EXPLANATION_ID
    //--CREATE EXPLANATION_TRANSLATION
    for (const explanation of editQuestionDto.explanations) {
      const savedExplanation = await this.explanationRepo.save(
        this.explanationRepo.create({
          position: explanation.position,
          index: explanation.index,
          text: '',
          question: question,
        })
      )
      
      const newExplanationTranslation =
        this.explanationTranslationRepo.create({
          explanation: savedExplanation,
          content: explanation.text,
          languageId: language.id,
        })
      await this.explanationTranslationRepo.save(newExplanationTranslation);    
    }
  }

  private getImageIds = (content: string) => {
    const $ = cheerio.load(content);    
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