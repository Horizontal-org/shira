import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';
import { Question } from 'src/modules/question/domain';
import { App } from 'src/modules/app/domain';
import { ReadResultQuizDto } from '../dto/read-result.quiz.dto';
import { IGetResultQuizService } from '../interfaces/services/get-result.quiz.service.interface';

@Injectable()
export class GetResultQuizService implements IGetResultQuizService{

  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,    
    @InjectRepository(App)
    private readonly appRepo: Repository<App>,
  ) {}

  async execute (quizId: number) {
    console.log("🚀 ~ AddResultQuizService ~ execute ~ addResultQuizDto:", addResultQuizDto)
    
    let question: Question;
          
    const app = await this.appRepo.findOne({
      where: { id: quizId },
    })
  }
}
