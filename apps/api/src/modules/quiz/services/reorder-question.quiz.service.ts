import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion } from '../domain/quizzes_questions.entity';
import { IReorderQuestionQuizService } from '../interfaces/services/reorder-question.quiz.service.interface';
import { ReorderQuestionQuizDto } from '../dto/reorder-question.quiz.dto';


@Injectable()
export class ReorderQuestionQuizService implements IReorderQuestionQuizService {

  constructor(    
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepo: Repository<QuizQuestion>,    
  ) {}

  async execute (reorderDto: ReorderQuestionQuizDto) {

    const quizQuestions = await this.quizQuestionRepo
      .createQueryBuilder('quizzes_questions')
      .where('quiz_id = :quizId ', { quizId: reorderDto.quizId })      
      .getMany()
  
    quizQuestions.forEach((quizQuestion, index) => {
      reorderDto.newOrder.forEach((newOrderItem) => {
        if (quizQuestion.questionId === newOrderItem.questionId) {
          quizQuestion.position = newOrderItem.position
        }
      })
    })

    await this.quizQuestionRepo.save(quizQuestions)      
  }
}