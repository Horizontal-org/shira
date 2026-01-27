import { Body, Param, Patch, Put } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create.question.dto';
import { CreateQuestionService } from '../services/create.question.service';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';

@AuthController('question')
export class EditQuestionController {
  constructor(private createQuestionService: CreateQuestionService) {}

  @Put(':id')
  @Roles(Role.SpaceAdmin)
  async handler(@Param('id') id: number, @Body() question: CreateQuestionDto) {
    console.log("🚀 ~ EditQuestionController ~ handler ~ question:", question)
    const langId = 1;
    this.createQuestionService.create(question, id, langId);
  }
}
