import { Body, Param, Patch } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create.question.dto';
import { CreateQuestionService } from '../services/create.question.service';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';

@AuthController('question')
export class EditQuestionController {
  constructor(private createQuestionService: CreateQuestionService) {}

  @Patch(':id')
  @Roles(Role.SpaceAdmin)
  async handler(@Param('id') id: number, @Body() question: CreateQuestionDto) {
    const langId = 1;
    this.createQuestionService.create(question, id, langId);
  }
}
