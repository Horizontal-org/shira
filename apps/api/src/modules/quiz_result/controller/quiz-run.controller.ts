import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { Inject } from '@nestjs/common';
import { IStartQuizRunService } from '../interfaces/services/start-quiz-run.service.interface';
import { IFinishQuizRunService } from '../interfaces/services/finish-quiz-run.service.interface';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { FinishQuizRunDto } from '../dto/finish-quiz-run.dto';

@Controller('quiz-run')
export class QuizRunController {
  constructor(
    @Inject(TYPES.services.IStartQuizRunService)
    private readonly startRun: IStartQuizRunService,
    @Inject(TYPES.services.IFinishQuizRunService)
    private readonly finishRun: IFinishQuizRunService,
  ) {}

  @Post()
  async start(
    @Body() dto: StartQuizRunDto
  ) {
    return await this.startRun.execute(dto);
  }

  @Patch(':id/finish')
  async finish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FinishQuizRunDto
  ) {
    return await this.finishRun.execute(id, dto);
  }
}
