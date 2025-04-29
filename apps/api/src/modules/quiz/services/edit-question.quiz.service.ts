import { Injectable, NotFoundException } from '@nestjs/common';
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
import { EditQuestionQuizDto } from '../dto/edit-question.quiz.dto';

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

  ) {}

  async execute (editQuestionDto: EditQuestionQuizDto) {
    console.log("🚀 ~ EditQuestionQuizService ~ execute ~ editQuestionDto:", editQuestionDto)
    
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

    //CREATE QUESTION
    //  <- RETURNS QUESTION-ID
    await this.questionRepo.save(question);

    //CREATE QUESTION_TRANSLATION WITH DEFAULT ON ENGLISH
    const questionTranslation = await this.questionTranslationRepo.findOne({
      where: { questionId: question.id }
    })

    questionTranslation.content = editQuestionDto.question.content;
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
}