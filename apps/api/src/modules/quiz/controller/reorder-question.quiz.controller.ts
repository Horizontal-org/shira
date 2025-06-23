import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { SpaceId } from 'src/modules/auth/decorators';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { IReorderQuestionQuizService } from '../interfaces/services/reorder-question.quiz.service.interface';
import { ReorderQuestionQuizDto } from '../dto/reorder-question.quiz.dto';

@AuthController('quiz')
export class ReorderQuestionQuizController {
  constructor(
    @Inject(TYPES.services.IReorderQuestionQuizService)
    private reorderQuestionService: IReorderQuestionQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Post('reorder')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() reorderDto: ReorderQuestionQuizDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, reorderDto.quizId)
 
    try {
      await this.reorderQuestionService.execute(reorderDto);
    } catch (e) {
      console.log("🚀 ~ ReorderQuestionQuizController ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
