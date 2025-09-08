import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';

import { ICreateQuestionQuizService as IAddResultQuizService } from '../interfaces/services/create-question.quiz.service.interface';
import { Question } from 'src/modules/question/domain';
import { App } from 'src/modules/app/domain';
import { AddResultQuizDto } from '../dto/add-result.quiz.dto';

@Injectable()
export class AddResultQuizService implements IAddResultQuizService{

  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,    
    @InjectRepository(App)
    private readonly appRepo: Repository<App>,
  ) {}

  async execute (addResultQuizDto: AddResultQuizDto) {
    console.log("🚀 ~ AddResultQuizService ~ execute ~ addResultQuizDto:", addResultQuizDto)
    
    let question: Question;
          
    const app = await this.appRepo.findOne({
      where: { id: addResultQuizDto.question.app },
    })
  }
}
