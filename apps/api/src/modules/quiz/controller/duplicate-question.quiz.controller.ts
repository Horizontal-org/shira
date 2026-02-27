import { Controller, Post, Param, Inject } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IDuplicateQuestionQuizService } from '../interfaces/services/duplicate-question.quiz.service.interface';
import { DuplicateQuestionQuizDto } from '../dto/duplicate-question.quiz.dto';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { SpaceId } from 'src/modules/auth/decorators/space-id.decorator';

@AuthController('quiz')
export class DuplicateQuestionQuizController {
  constructor(
    @Inject(TYPES.services.IDuplicateQuestionQuizService)
    private duplicateQuestionQuizService: IDuplicateQuestionQuizService,
  ) { }

  @Post(':quizId/questions/:questionId/duplicate')
  @Roles(Role.SpaceAdmin)
  async duplicateQuestion(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
    @SpaceId() spaceId: number
  ) {
    const duplicateQuestionDto: DuplicateQuestionQuizDto = {
      quizId: parseInt(quizId),
      questionId: parseInt(questionId),
    };

    await this.duplicateQuestionQuizService.execute(duplicateQuestionDto, spaceId);

    return {
      message: 'Question duplicated successfully',
    };
  }
}