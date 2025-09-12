import { Body, Controller, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateQuestionRunDto } from '../../question/dto/create-question-run.quiz';
import { QuestionRun } from '../../quiz_result/domain/question_runs.entity';
import { TYPES } from '../../quiz_result/interfaces';
import { ICreateQuestionRunService } from '../../quiz_result/interfaces/services/create-question-run.service.interface';

@Controller('quiz-run/:runId/question-run')
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
