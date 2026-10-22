import {
  Get,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';

import { SpaceExportQuestionService } from '../services/spaceExport.question.service';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { SpaceId } from 'src/modules/auth/decorators/space-id.decorator';

@AuthController('question')
export class ExportQuestionController {
  constructor(
    private spaceExportQuestionService: SpaceExportQuestionService,
  ) {}

  @Get(':id/export')
  @Roles(Role.SpaceAdmin)
  async export(
    @Param('id', ParseIntPipe) id: number,
    @SpaceId() spaceId: number,
    @Res() res,
  ) {
    await this.spaceExportQuestionService.export({ id, spaceId, res });
  }
}
