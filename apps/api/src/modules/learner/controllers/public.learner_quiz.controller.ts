import { Controller, Get, Inject, NotFoundException, Param } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IGetLearnerQuizService } from '../interfaces/services/get.learner-quiz.service.interface';

@Controller('learner-quiz')
export class PublicLearnerQuizController {
  constructor(
    @Inject(TYPES.services.IGetLearnerQuizService)
    private readonly getLearnerQuizService: IGetLearnerQuizService,    
  ) { }

  @Get(':hash')
  async getLearnerQuizByHash(@Param('hash') hash: string) {
    try {
      const learnerQuiz =  await this.getLearnerQuizService.execute(hash);
      return learnerQuiz
    } catch (e) {
      console.debug("🚀 ~ LearnerQuizController ~ getLearnerQuizByHash ~ e:", e)
      throw new NotFoundException()
    }
  }

}
