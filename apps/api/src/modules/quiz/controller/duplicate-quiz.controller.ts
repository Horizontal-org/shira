import { Controller, Post, Param, Body, Inject } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IDuplicateQuizService } from '../interfaces/services/duplicate-quiz.service.interface';
import { DuplicateQuizDto } from '../dto/duplicate-quiz.dto';
import { QuizVisibility } from '../dto/quiz-visibility-enum.quiz';

@Controller()
export class DuplicateQuizController {
  constructor(
    @Inject(TYPES.services.IDuplicateQuizService)
    private duplicateQuizService: IDuplicateQuizService,
  ) { }

  @Post('quiz/:quizId/duplicate')
  async duplicateQuiz(
    @Param('quizId') quizId: string,
    @Body('title') title: string,
    @Body('visibility') visibility: QuizVisibility,
  ) {
    const duplicateQuizDto: DuplicateQuizDto = {
      quizId: parseInt(quizId),
      title: title,
      visibility,
    };

    const newQuiz = await this.duplicateQuizService.execute(duplicateQuizDto);

    return {
      message: 'Quiz duplicated successfully',
      quiz: newQuiz,
    };
  }
}