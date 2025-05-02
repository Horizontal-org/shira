import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IDeleteQuizService } from '../interfaces/services/delete.quiz.service.interface';
import { DeleteQuizDto } from '../dto/delete.quiz.dto';
import { QuizQuestion } from '../domain/quizzes_questions.entity';
import { IDeleteQuestionQuizService } from '../interfaces/services/delete-question.quiz.service.interface';
import { DeleteQuestionQuizDto } from '../dto/delete-question.quiz.dto';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { Question } from 'src/modules/question/domain';


@Injectable()
export class DeleteQuestionQuizService implements IDeleteQuestionQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepo: Repository<QuizQuestion>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepo: Repository<QuestionTranslation>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  async execute (deleteDto: DeleteQuestionQuizDto) {

    const quizQuestions = await this.quizQuestionRepo
      .createQueryBuilder('quizzes_questions')
      .where('quiz_id = :quizId ', { quizId: deleteDto.quizId })      
      .getMany()
      
    //validate question is part of this list
    const quizQuestionToDelete = quizQuestions.find(qq => qq.questionId === deleteDto.questionId)      
    if (!quizQuestionToDelete) {
      throw new NotFoundException()
    }

    let newList = quizQuestions
      .filter(qq => qq.questionId !== deleteDto.questionId)
      .sort((a, b) => a.position - b.position)

    newList.forEach((quizQuestion, index) => {
      quizQuestion.position = index + 1
    })

    await this.quizQuestionRepo.save(newList)
    await this.quizQuestionRepo.delete(quizQuestionToDelete.id)
    
    await this.questionTranslationRepo.delete({ 'questionId': quizQuestionToDelete.questionId })
    await this.questionRepo.delete(quizQuestionToDelete.questionId);
    
  }
}