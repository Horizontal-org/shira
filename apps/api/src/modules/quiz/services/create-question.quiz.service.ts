import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';

import { ICreateQuestionQuizService } from '../interfaces/services/create-question.quiz.service.interface';
import { CreateQuestionQuizDto } from '../dto/create-question.quiz.dto';
import { Explanation, Question } from 'src/modules/question/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import { App } from 'src/modules/app/domain';

import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { ISyncQuestionImageService } from 'src/modules/question_image/interfaces/services/sync.question_image.service.interface';
import * as cheerio from 'cheerio';

@Injectable()
export class CreateQuestionQuizService implements ICreateQuestionQuizService{

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

  async execute (createQuestionDto: CreateQuestionQuizDto) {
    console.log("🚀 ~ CreateQuestionQuizService ~ execute ~ createQuestionDto:", createQuestionDto)
    
    let question: Question;
          
    const app = await this.appRepo.findOne({
      where: { id: createQuestionDto.question.app },
    })

    const language = await this.languageRepo.findOne({
      where: { code: 'en' },
    })

    question = new Question();
    question.name = createQuestionDto.question.name;
    question.isPhising = createQuestionDto.question.isPhishing ? 1 : 0;
    question.apps = [app];
    question.languageId = language.id;
    question.content = '';
    question.type = 'quiz'    

    //CREATE QUESTION
    //  <- RETURNS QUESTION-ID
    const questionEntity = await this.questionRepo.save(question);

    //SYNC IMAGES HERE
    const imageIds = this.getImageIds(createQuestionDto.question.content)
    await this.syncImagesService.execute({
      imageIds: imageIds,
      questionId: questionEntity.id,
      quizId: createQuestionDto.quizId
    })


    //CREATE QUESTION_TRANSLATION WITH DEFAULT ON ENGLISH
    const newQuestionTranslation = new QuestionTranslation();
    newQuestionTranslation.content = createQuestionDto.question.content;
    newQuestionTranslation.question = questionEntity;
    newQuestionTranslation.languageId = language.id;
    await this.questionTranslationRepo.save(newQuestionTranslation);
    
    //ON LOOP
    //--CREATE EXPLANATION
    //--<-RETURN EXPLANATION_ID
    //--CREATE EXPLANATION_TRANSLATION
    for (const explanation of createQuestionDto.explanations) {
      const savedExplanation = await this.explanationRepo.save(
        this.explanationRepo.create({
          position: explanation.position,
          index: explanation.index,
          text: '',
          question: questionEntity,
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


    //GET QUIZ_QUESTIONS COUNT FOR POSITION
    const position = await this.quizQuestionRepo
      .count({ where: { quizId: createQuestionDto.quizId } })

    //CREATE QUIZ_QUESTION
    const quizQuestion = this.quizQuestionRepo.create({
      position: position + 1,
      quizId: createQuestionDto.quizId,
      questionId: questionEntity.id
    })
    await this.quizQuestionRepo.save(quizQuestion)
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