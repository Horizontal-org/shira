import { Body, Controller, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateQuestionRunDto } from '../dto/create-question-run.dto';
import { QuestionRun } from '../domain/question_runs.entity';
import { TYPES } from '../interfaces';
import { ICreateQuestionRunService } from '../interfaces/services/create-question-run.quiz.service.interface';

@Controller('quiz-runs/:runId/question-runs')
export class QuestionRunController {
  constructor(
    @Inject(TYPES.services.ICreateQuestionRunService)
    private readonly service: ICreateQuestionRunService,
  ) {}

  @Post()
  async create(
    @Param('runId', ParseIntPipe) runId: number,
    @Body() dto: CreateQuestionRunDto,
  ): Promise<QuestionRun> {
    return this.service.execute(runId, dto);
  }
}
