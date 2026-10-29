import { Body, Controller, Headers, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateQuestionRunDto } from '../../quiz_result/dto/create-question-run.quiz';
import { QuestionRun } from '../../quiz_result/domain/question_runs.entity';
import { TYPES } from '../../quiz_result/interfaces';
import { ICreateQuestionRunService } from '../../quiz_result/interfaces/services/create-question-run.service.interface';
import { QUIZ_RUN_TOKEN_HEADER } from './quiz-run-token.header';

@Controller('quiz-run/:runId/question-run')
export class QuestionRunController {
  constructor(
    @Inject(TYPES.services.ICreateQuestionRunService)
    private readonly service: ICreateQuestionRunService,
  ) {}

  @Post()
  async create(
    @Param('runId', ParseIntPipe) runId: number,
    @Headers(QUIZ_RUN_TOKEN_HEADER) token: string | undefined,
    @Body() dto: CreateQuestionRunDto,
  ): Promise<QuestionRun> {
    return this.service.execute(runId, token, dto);
  }
}
