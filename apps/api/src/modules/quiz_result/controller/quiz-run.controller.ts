import { Body, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { Inject } from '@nestjs/common';
import { IStartQuizRunService } from '../interfaces/services/start-quiz-run.service.interface';
import { IFinishQuizRunService } from '../interfaces/services/finish-quiz-run.service.interface';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { FinishQuizRunDto } from '../dto/finish-quiz-run.dto';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';

@AuthController('quiz-run')
export class QuizRunController {
  constructor(
    @Inject(TYPES.services.IStartQuizRunService)
    private readonly startRun: IStartQuizRunService,
    @Inject(TYPES.services.IFinishQuizRunService)
    private readonly finishRun: IFinishQuizRunService
  ) { }

  @Post()
  async start(
    @Body() dto: StartQuizRunDto
  ) {
    return await this.startRun.execute(dto);
  }

  @Patch(':runId/finish')
  async finish(
    @Param('runId', ParseIntPipe) runId: number,
    @Body() dto: FinishQuizRunDto
  ) {
    return await this.finishRun.execute(runId, dto);
  }
}
