import { Get, Param, ParseIntPipe, Res } from '@nestjs/common';

import { ExportQuizService } from '../services/export.quiz.service';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('quiz')
export class ExportQuizController {
  constructor(private exportQuizService: ExportQuizService) {}

  @Get(':id/export')
  @Roles(Role.SpaceAdmin)
  async export(
    @Param('id', ParseIntPipe) id: number,
    @SpaceId() spaceId: number,
    @Res() res,
  ) {
    await this.exportQuizService.export({ id, spaceId, res });
  }
}
