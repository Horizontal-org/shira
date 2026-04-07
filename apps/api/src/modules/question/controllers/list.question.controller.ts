import { Get, Param, Query } from '@nestjs/common';
import { SpaceId } from 'src/modules/auth/decorators';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { ListQuestionService } from '../services/list.question.service';

@AuthController('question')
export class ListQuestionController {
  constructor(private readonly listQuestionService: ListQuestionService) { }

  @Get('')
  @Roles(Role.SuperAdmin)
  async getQuestions(@SpaceId() spaceId: number) {
    return this.listQuestionService.getQuestions(spaceId);
  }

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  async getQuestionById(
    @Param('id') id: string,
    @Query('lang') lang: string,
    @SpaceId() spaceId: number,
  ) {
    return this.listQuestionService.getQuestion(spaceId, id, lang);
  }
}
