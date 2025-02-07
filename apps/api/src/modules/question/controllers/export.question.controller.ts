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

@Controller('question')
export class ExportQuestionController {
  constructor(
    private parserQuestionService: ParserQuestionService,
    private globalParserQuestionService: GlobalParserQuestionService,
  ) {}

  @Get(':id/export/:lang')
  async export(
    @Param('id') id: string,
    @Param('lang') lang: string,
    @Res() res,
  ) {
    this.parserQuestionService.export({ id, lang, res });
  }

  @Get('/global-export/:lang')
  async globalExport(
    @Param('id') id: string,
    @Param('lang') lang: string,
    @Res() res,
  ) {
    this.globalParserQuestionService.export({ lang, res });
  }

}

