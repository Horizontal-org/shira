import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../domain';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question')
export class TranslationsQuestionController {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) { }

  @Get(':id/translations')
  @Roles(Role.SuperAdmin)
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
