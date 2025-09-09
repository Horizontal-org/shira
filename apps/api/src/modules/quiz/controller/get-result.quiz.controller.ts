import { Inject, Get, Param, ParseIntPipe, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { IGetResultQuizService } from '../interfaces/services/get-result.quiz.service.interface';

@AuthController('quiz')
export class GetResultQuizController {
  constructor(
    @Inject(TYPES.services.IGetResultQuizService)
    private getResultQuizService: IGetResultQuizService
  ) { }

  @Get('/:quizId/results')
  async handler(
    @Param('quizId', ParseIntPipe) quizId: number,
  ) {
    //TODO await this.validateSpaceQuizService.execute(quizId, reorderDto.quizId)

    try {
      return await this.getResultQuizService.execute(quizId);
    } catch (e) {
      console.log("🚀 ~ GetResultQuizController ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}
