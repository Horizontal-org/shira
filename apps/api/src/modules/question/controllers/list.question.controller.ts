import { Get, Param, Query } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { ListQuestionService } from '../services/list.question.service';

@AuthController('question')
export class ListQuestionController {
  constructor(private readonly listQuestionService: ListQuestionService) { }

  @Get('')
  @Roles(Role.SuperAdmin)
  async getQuestions() {
    return this.listQuestionService.getQuestions();
  }

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  async getQuestionById(
    @Param('id') id: string,
    @Query('lang') lang: string
  ) {
    return this.listQuestionService.getQuestion(id, lang);
  }
}
