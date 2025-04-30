import { Body, Inject, Post, Put, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { CreateQuestionQuizService } from '../services/create-question.quiz.service';
import { CreateQuestionQuizDto } from '../dto/create-question.quiz.dto';
import { TYPES } from '../interfaces';
import { ICreateQuestionQuizService } from '../interfaces/services/create-question.quiz.service.interface';
import { EditQuestionQuizDto } from '../dto/edit-question.quiz.dto';
import { IEditQuestionQuizService } from '../interfaces/services/edit-question.quiz.service.interface';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { LoggedUser } from 'src/modules/auth/decorators';

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
    @LoggedUser() user: LoggedUserDto
  ) {

    await this.validateSpaceQuizService.execute(user.space.id, newQuestion.quizId)

    try {
      await this.editQuestionService.execute(newQuestion);
    } catch (e) {
      console.log("🚀 ~ CreateQuestionQuizController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
