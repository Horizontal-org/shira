import { Controller, Post, Param, Body, Inject, UseGuards } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IDuplicateQuizService } from '../interfaces/services/duplicate-quiz.service.interface';
import { DuplicateQuizDto } from '../dto/duplicate-quiz.dto';
import { QuizVisibility } from '../dto/quiz-visibility-enum.quiz';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { SpaceId } from 'src/modules/auth/decorators/space-id.decorator';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';
import { SubscriptionDecorator } from 'src/modules/subscription/decorators/subscription.decorator';
import { SubscriptionGuard } from 'src/modules/subscription/guards/subscription.guard';
import { IValidateCreateQuizService } from '../interfaces/services/validate-create.quiz.service.interface';

@AuthController('quiz')
export class DuplicateQuizController {
  constructor(
    @Inject(TYPES.services.IDuplicateQuizService)
    private duplicateQuizService: IDuplicateQuizService,
    @Inject(TYPES.services.IValidateCreateQuizService)
        private validateQuizService: IValidateCreateQuizService,
  ) { }

  @Post(':quizId/duplicate')
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async duplicateQuiz(
    @Param('quizId') quizId: string,
    @Body('title') title: string,
    @Body('visibility') visibility: QuizVisibility,
    @SpaceId() spaceId: number,
    @SubscriptionDecorator() subscription?: CachedSubscription
  ) {
    const duplicateQuizDto: DuplicateQuizDto = {
      quizId: parseInt(quizId),
      title: title,
      visibility,
    };

    await this.validateQuizService.execute(subscription, visibility, spaceId)

    const newQuiz = await this.duplicateQuizService.execute(duplicateQuizDto, spaceId);

    return {
      message: 'Quiz duplicated successfully',
      quiz: newQuiz,
    };
  }
}