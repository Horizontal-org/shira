import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../domain';
import { Language } from 'src/modules/languages/domain';

@Controller('question')
export class TranslationsQuestionController {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  @Get(':id/translations')
  async getQuestion(@Param('id') id: number, @Query('lang') lang: string) {

    const res = await this.questionRepository.findOne(
    {
      where: { id: id },
      relations: [
        'questionTranslations', 
        'questionTranslations.languageId', 
        'explanations', 
        'explanations.explanationTranslations',
        'explanations.explanationTranslations.languageId'
      ]
    })
    return res;
  }
}
