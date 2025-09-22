import { Get, Logger, Res, Inject, Controller } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question')
export class LibraryQuestionsController {
  private readonly logger = new Logger(LibraryQuestionsController.name);
  constructor(
    @Inject(TYPES.services.IGetLibraryQuestionService)
    private service: IGetLibraryQuestionService,
  ) {}

  @Get('library')
  @Roles(Role.SpaceAdmin)
  async getLibrary() {
    this.logger.log('GET /question/library hit');
    console.log("🚀 ~ GetLibraryQuestionsController ~")

    return await this.service.execute();
  }
}