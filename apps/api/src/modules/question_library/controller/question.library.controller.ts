import { Get, Logger, Inject, Controller, Res } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';

@AuthController('question/library')
export class QuestionLibraryController {
  constructor(
    @Inject(TYPES.services.IGetLibraryQuestionService)
    private service: IGetLibraryQuestionService,
  ) { }

  @Get('')
  @Roles(Role.SpaceAdmin)
  async getLibrary() {
    return await this.service.execute();
  }
}