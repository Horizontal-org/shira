import { Body, Inject, Put, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { EditQuestionQuizDto } from '../dto/edit-question.quiz.dto';
import { IEditQuestionQuizService } from '../interfaces/services/edit-question.quiz.service.interface';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('quiz')
export class EditQuestionQuizController {
  constructor(
    @Inject(TYPES.services.IEditQuestionQuizService)
    private editQuestionService: IEditQuestionQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Put('question')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() newQuestion: EditQuestionQuizDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, newQuestion.quizId)

    try {
      await this.editQuestionService.execute(newQuestion);
    } catch (e) {
      console.log("🚀 ~ CreateQuestionQuizController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
