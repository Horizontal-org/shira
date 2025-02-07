import {
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  Body,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';

import { ParserQuestionService } from '../services/individualParser.question.service';
import { GlobalParserQuestionService } from '../services/globalParser.question.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question')
export class ParserQuestionController {
  constructor(
    private parserQuestionService: ParserQuestionService,
    private globalParserQuestionService: GlobalParserQuestionService,
  ) {}

  @Post(':id/import')
  @Roles(Role.SpaceAdmin)
  @UseInterceptors(FilesInterceptor('files'))
  async import(
    @UploadedFiles() files,
    @Body() body: { id: string },
    @Res() res,
  ) {
    const { id } = body;
    this.parserQuestionService.import({ id, files, res });  }

  @Post('/global-import')
  @Roles(Role.SpaceAdmin)
  @UseInterceptors(FilesInterceptor('files'))
  async globalImport(@UploadedFiles() files, @Res() res) {
    this.globalParserQuestionService.import({ files, res });
  }
}
