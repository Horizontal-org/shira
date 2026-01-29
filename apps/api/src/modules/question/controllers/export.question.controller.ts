import {
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  Body,
  UseInterceptors,
  Controller,
} from '@nestjs/common';

import { ParserQuestionService } from '../services/individualParser.question.service';
import { GlobalParserQuestionService } from '../services/globalParser.question.service';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question')
export class ExportQuestionController {
  constructor(
    private parserQuestionService: ParserQuestionService,
    private globalParserQuestionService: GlobalParserQuestionService,
  ) {}

  @Get(':id/export/:lang')
  @Roles(Role.SuperAdmin)
  async export(
    @Param('id') id: string,
    @Param('lang') lang: string,
    @Res() res,
  ) {
    this.parserQuestionService.export({ id, lang, res });
  }

  @Get('/global-export/:lang')
  @Roles(Role.SuperAdmin)
  async globalExport(
    // @Param('id') id: string,
    @Param('lang') lang: string,
    @Res() res,
  ) {
    this.globalParserQuestionService.export({ lang, res });
  }

}

