import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { CreateQuestionQuizService } from '../services/create-question.quiz.service';
import { CreateQuestionQuizDto } from '../dto/create-question.quiz.dto';
import { TYPES } from '../interfaces';
import { ICreateQuestionQuizService } from '../interfaces/services/create-question.quiz.service.interface';

@AuthController('quiz')
export class CreateQuestionQuizController {
  constructor(
    @Inject(TYPES.services.ICreateQuestionQuizService)
    private createQuestionService: ICreateQuestionQuizService
  ) {}

  @Post('question')
  @Roles(Role.SpaceAdmin)
  async handler(@Body() newQuestion: CreateQuestionQuizDto) {
    console.log("🚀 ~ CreateQuestionQuizController ~ handler ~ newQuestion:", newQuestion)

    // validate quiz is from this space 

    try {
      await this.createQuestionService.execute(newQuestion);
    } catch (e) {
      console.log("🚀 ~ CreateQuestionQuizController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
