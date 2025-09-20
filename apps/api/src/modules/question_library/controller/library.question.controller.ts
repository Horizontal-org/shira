import { Get } from '@nestjs/common';
import { CreateQuestionService as AddLibraryQuestionService } from '../services/library.question.service';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question/library/')
export class GetLibraryQuestionsController {
  constructor(private service: AddLibraryQuestionService) {}

  @Get('')
  @Roles(Role.SpaceAdmin)
  async handler() {
    this.service.get();
  }
}
