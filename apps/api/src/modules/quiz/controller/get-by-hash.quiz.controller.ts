import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  TYPES,
} from '../interfaces';
import { IGetByHashQuizService } from '../interfaces/services/get-by-hash.quiz.service.interface';

@Controller('quiz')
export class GetByHashQuizController {
  constructor(
    @Inject(TYPES.services.IGetByHashQuizService)
    private getQuizService: IGetByHashQuizService,
  ) {}

  @Get('/hash/:hash')
  async getByHash(
    @Param('hash') hash: string    
  ) 
  {    
    const quiz = await this.getQuizService.execute(hash)
    return quiz
  }
}
