import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { Inject } from '@nestjs/common';
import { IStartQuizRunService } from '../interfaces/services/start-quiz-run.service.interface';
import { IFinishQuizRunService } from '../interfaces/services/finish-quiz-run.service.interface';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { FinishQuizRunDto } from '../dto/finish-quiz-run.dto';
import { IGetQuizRunsService } from '../interfaces/services/get-quiz-runs-by-quiz.service.interface';

@Controller('quiz-run')
export class QuizRunController {
  constructor(
    @Inject(TYPES.services.IStartQuizRunService)
    private readonly startRun: IStartQuizRunService,
    @Inject(TYPES.services.IFinishQuizRunService)
    private readonly finishRun: IFinishQuizRunService,
    @Inject(TYPES.services.IGetQuizRunsByQuizService)
    private readonly quizRuns: IGetQuizRunsService,
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

  @Get(':spaceId')
  async getAllRuns(
    @Param('spaceId', ParseIntPipe) spaceId: number,
  ) {
    return await this.quizRuns.getLatestBySpaceId(spaceId);
  }
}
