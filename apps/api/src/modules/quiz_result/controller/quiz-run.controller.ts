import { Body, Controller, Headers, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { Inject } from '@nestjs/common';
import { IStartQuizRunService } from '../interfaces/services/start-quiz-run.service.interface';
import { IFinishQuizRunService } from '../interfaces/services/finish-quiz-run.service.interface';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { FinishQuizRunDto } from '../dto/finish-quiz-run.dto';
import { QUIZ_RUN_TOKEN_HEADER } from './quiz-run-token.header';
import { Throttle } from '@nestjs/throttler';
import { QUIZ_RUN_START_LIMIT_PER_HOUR } from 'src/utils/environment/quiz-run-rate-limit.environment';

@Controller('quiz-run')
export class QuizRunController {
  constructor(
    @Inject(TYPES.services.IStartQuizRunService)
    private readonly startRun: IStartQuizRunService,
    @Inject(TYPES.services.IFinishQuizRunService)
    private readonly finishRun: IFinishQuizRunService
  ) { }

  @Post()
  @Throttle({ default: { limit: QUIZ_RUN_START_LIMIT_PER_HOUR, ttl: 60 * 60 * 1000 } })
  async start(
    @Body() dto: StartQuizRunDto
  ) {
    return await this.startRun.execute(dto);
  }

  @Patch(':runId/finish')
  async finish(
    @Param('runId', ParseIntPipe) runId: number,
    @Headers(QUIZ_RUN_TOKEN_HEADER) token: string | undefined,
    @Body() dto: FinishQuizRunDto
  ) {
    const run = await this.finishRun.execute(runId, token, dto);
    return { id: run.id, quizId: run.quizId, finishedAt: run.finishedAt };
  }
}