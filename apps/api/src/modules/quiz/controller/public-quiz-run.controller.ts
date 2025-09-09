import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { Inject } from '@nestjs/common';
import { IStartQuizRunService } from '../interfaces/services/start-quiz-run.service.interface';
import { IFinishQuizRunService } from '../interfaces/services/finish-quiz-run.service.interface';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { FinishQuizRunDto } from '../dto/finish-quiz-run.dto';

@Controller('quiz/run')
export class PublicQuizRunController {
  constructor(
    @Inject(TYPES.services.IStartQuizRunService)
    private readonly startSvc: IStartQuizRunService,
    @Inject(TYPES.services.IFinishQuizRunService)
    private readonly finishSvc: IFinishQuizRunService,
  ) {}

  @Post()
  async start(
    @Body() dto: StartQuizRunDto
  ) {
    const run = await this.startSvc.execute(dto);
    return {
      id: run.id,
      quizId: run.quizId,
      learnerId: run.learnerId,
      startedAt: run.startedAt,
      finishedAt: run.finishedAt ?? null,
    };
  }

  @Patch(':id')
  async finish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FinishQuizRunDto
  ) {
    const run = await this.finishSvc.execute(id, dto);
    return {
      id: run.id,
      quizId: run.quizId,
      learnerId: run.learnerId,
      startedAt: run.startedAt,
      finishedAt: run.finishedAt ?? null,
    };
  }
}
