import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getManager, Repository } from 'typeorm';
import { Question } from '../domain';
import { GenerateQuizQuestionService } from '../services/quiz.question.service';

@Controller('question')
export class QuizQuestionController {
  constructor(private generateQuizService: GenerateQuizQuestionService) {}

  @Get('quiz')
  async handler(
    @Query(
      'apps',
      new ParseArrayPipe({ items: Number, separator: ',', optional: true }),
    )
    apps = [],
    @Query(
      'fieldsOfWork',
      new ParseArrayPipe({ items: Number, separator: ',', optional: true }),
    )
    fieldsOfWork = [],
    @Query('lang') lang?: string,
  ) {
    const res = await this.generateQuizService.generate(
      apps,
      fieldsOfWork,
      lang,
    );
    return res;
  }
}
