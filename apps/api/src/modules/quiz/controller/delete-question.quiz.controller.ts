import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { LoggedUser } from 'src/modules/auth/decorators';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { IDeleteQuestionQuizService } from '../interfaces/services/delete-question.quiz.service.interface';
import { DeleteQuestionQuizDto } from '../dto/delete-question.quiz.dto';

@AuthController('quiz')
export class DeleteQuestionQuizController {
  constructor(
    @Inject(TYPES.services.IDeleteQuestionQuizService)
    private deleteQuestionQuizService: IDeleteQuestionQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Post('question/delete')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() deleteDto: DeleteQuestionQuizDto,
    @LoggedUser() user: LoggedUserDto
  ) {
    
    await this.validateSpaceQuizService.execute(user.space.id, deleteDto.quizId)
 
    try {
      await this.deleteQuestionQuizService.execute(deleteDto);
    } catch (e) {
      console.log("🚀 ~ DeleteQuestionQuizController ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
