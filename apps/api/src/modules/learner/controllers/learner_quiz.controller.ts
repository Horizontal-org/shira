import { Body, Controller, Get, Inject, NotFoundException, Param, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { IGetLearnerQuizService } from '../interfaces/services/get.learner-quiz.service.interface';

// PUBLIC
@Controller('learner-quiz')
export class LearnerQuizController {
  constructor(
    @Inject(TYPES.services.IGetLearnerQuizService)
    private readonly getLearnerQuizService: IGetLearnerQuizService,    
  ) { }

  @Get(':hash')
  async getLearnerQuizByHash(@Param('hash') hash: string) {
    try {
      const learnerQuiz =  await this.getLearnerQuizService.execute(hash);
      console.log("🚀 ~ LearnerQuizController ~ getLearnerQuizByHash ~ learnerQuiz:", learnerQuiz)
      return learnerQuiz
    } catch (e) {
      throw new NotFoundException()
    }
  }

}
