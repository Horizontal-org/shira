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

@AuthController('quiz')
export class EditQuestionQuizController {
  constructor(
    @Inject(TYPES.services.IEditQuestionQuizService)
    private editQuestionService: IEditQuestionQuizService
  ) {}

  @Put('question')
  @Roles(Role.SpaceAdmin)
  async handler(@Body() newQuestion: EditQuestionQuizDto) {
  console.log("🚀 ~ EditQuestionQuizController ~ handler ~ newQuestion:", newQuestion)

    // validate quiz is from this space 
    // const quiz = this.quizRepo
    // .createQueryBuilder('quiz')
    // .where('space_id = :spaceId', { spaceId: spaceId })
    // .andWhere('id = :id', { id: id })
    // .getOne()

    try {
      await this.editQuestionService.execute(newQuestion);
    } catch (e) {
      console.log("🚀 ~ CreateQuestionQuizController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
