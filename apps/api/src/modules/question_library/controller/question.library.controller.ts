import { Body, Get, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IGetLibraryQuestionService } from '../interfaces/services/get-question-library.service.interface';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { DuplicateQuestionLibraryDto } from '../dto/duplicate-question-library.dto';
import { IDuplicateLibraryQuestionService } from '../interfaces/services/duplicate-question-library.service.interface';

@AuthController('question/library')
export class QuestionLibraryController {
  constructor(
    @Inject(TYPES.services.IGetLibraryQuestionService)
    private getService: IGetLibraryQuestionService,
    @Inject(TYPES.services.IDuplicateLibraryQuestionService)
    private duplicateService: IDuplicateLibraryQuestionService,
  ) { }

  @Get('')
  @Roles(Role.SpaceAdmin)
  async getLibrary() {
    return await this.getService.execute();
  }

  @Post(':questionId/duplicate')
  @Roles(Role.SpaceAdmin)
  async duplicateQuestion(
    @Param('questionId') questionId: string,
    @Body() dto: DuplicateQuestionLibraryDto,
  ) {
    const duplicateQuestionDto: DuplicateQuestionLibraryDto = {
      quizId: dto.quizId,
      languageId: dto.languageId,
      appId: dto.appId,
    };

    await this.duplicateService.execute(questionId, duplicateQuestionDto);

    return {
      message: 'Question library duplicated successfully',
    };
  }
}