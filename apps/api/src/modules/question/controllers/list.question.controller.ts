import { Get, Param, Query } from '@nestjs/common';
import { SpaceId } from 'src/modules/auth/decorators';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { ListQuestionService } from '../services/list.question.service';
import { ApiLogger } from 'src/utils/logger/api-logger.service';

@AuthController('question')
export class ListQuestionController {
  constructor(private readonly listQuestionService: ListQuestionService) { }

  private readonly logger = new ApiLogger(ListQuestionController.name);

  @Get('')
  @Roles(Role.SuperAdmin)
  async getQuestions() {
    return this.listQuestionService.getQuestions();
  }

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  async getQuestionById(
    @Param('id') id: string,
    @Query('lang') lang: string,
    @SpaceId() spaceId: number,
  ) {
    this.logger.log(`SANITY CHECK - /QUESTION/ID CALLING GET QUESTION BY ID`);
    return this.listQuestionService.getQuestion(spaceId, id, lang);
  }

  @Get('super/:id')
  @Roles(Role.SuperAdmin)
  async getSuperadminQuestionById(
    @Param('id') id: string,
    @Query('lang') lang: string,
  ) {
    this.logger.log(`SANITY CHECK - /QUESTION/SUPER/ID CALLING GET SUPERADMIN QUESTION BY ID`);
    return this.listQuestionService.getSuperadminQuestion(id, lang);
  }
}
