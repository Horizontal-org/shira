import { Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteQuestionDto } from '../dto/delete.question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Repository } from 'typeorm';
import { Question } from '../domain';
import { QuestionTranslation } from '../../translation/domain/questionTranslation.entity';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question')
export class DeleteQuestionController {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepository: Repository<QuestionTranslation>,
  ) {}

  @Delete(':id')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Param('id', ParseIntPipe)
    id: DeleteQuestionDto,
  ) {
    await this.questionTranslationRepository.delete({ question: id });
    await this.questionRepository.delete(id);

    return true;
  }
}
