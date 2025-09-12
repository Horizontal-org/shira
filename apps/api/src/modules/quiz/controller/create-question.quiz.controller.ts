import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { CreateQuestionQuizDto } from '../../quiz_result/dto/create-question.quiz.dto';
import { TYPES } from '../interfaces';
import { ICreateQuestionQuizService } from '../interfaces/services/create-question.quiz.service.interface';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('quiz')
export class CreateQuestionQuizController {
  constructor(
    @Inject(TYPES.services.ICreateQuestionQuizService)
    private createQuestionService: ICreateQuestionQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Post('question')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() newQuestion: CreateQuestionQuizDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, newQuestion.quizId)

    try {
      await this.createQuestionService.execute(newQuestion);
    } catch (e) {
      console.log("🚀 ~ CreateQuestionQuizController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
