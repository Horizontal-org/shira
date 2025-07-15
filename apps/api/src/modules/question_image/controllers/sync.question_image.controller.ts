import { Body, Inject, Post } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionImage } from '../domain';
import { Repository } from 'typeorm';
import { SyncQuestionImageDto } from '../dto/sync.question_image.dto';
import { TYPES } from '../interfaces';
import { ISyncQuestionImageService } from '../interfaces/services/sync.question_image.service.interface';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

//MANUAL UPDATE | TESTING REASONS ONLY
@AuthController('question-image')
export class SyncQuestionImageController {

 constructor(
  @Inject(TYPES.services.ISyncQuestionImageService)
  private sync: ISyncQuestionImageService,
  @InjectRepository(QuestionImage)
  private readonly questionImageRepository: Repository<QuestionImage>,
) {}
 
  @Post('sync')
  @Roles(Role.SuperAdmin)
  async syncQuestion(
    @Body() syncQuestionImageDto: SyncQuestionImageDto
  ) {
    await this.sync.execute(syncQuestionImageDto)
  }
}  