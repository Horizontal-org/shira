import { Controller, Post, Param, Inject } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IDuplicateQuestionQuizService } from '../interfaces/services/duplicate-question.quiz.service.interface';
import { DuplicateQuestionQuizDto } from '../dto/duplicate-question.quiz.dto';

@Controller()
export class DuplicateQuestionQuizController {
  constructor(
    @Inject(TYPES.services.IDuplicateQuestionQuizService)
    private duplicateQuestionQuizService: IDuplicateQuestionQuizService,
  ) {}

  @Post('quiz/:quizId/questions/:questionId/duplicate')
  async duplicateQuestion(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
  ) {
    const duplicateQuestionDto: DuplicateQuestionQuizDto = {
      quizId: parseInt(quizId),
      questionId: parseInt(questionId),
    };

    await this.duplicateQuestionQuizService.execute(duplicateQuestionDto);
    
    return {
      message: 'Question duplicated successfully',
    };
  }
}