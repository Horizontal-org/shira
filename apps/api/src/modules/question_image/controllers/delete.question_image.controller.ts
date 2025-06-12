import { Body, Inject, Post } from '@nestjs/common';
import { TYPES as TYPES_IMAGE } from '../../image/interfaces';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { DeleteQuestionImageDto } from '../dto/delete.question_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionImage } from '../domain';
import { Repository } from 'typeorm';

@AuthController('question_image')
export class DeleteQuestionImageController {

 constructor(
  @Inject(TYPES_IMAGE.services.IImageService)
  private imageService: IImageService,
  @InjectRepository(QuestionImage)
  private readonly questionImageRepository: Repository<QuestionImage>,
) {}
 
  @Post('delete')
  async getFile(
    @Body() deleteQuestionImageDto: DeleteQuestionImageDto
  ) {
    const questionImage = await this.questionImageRepository.findOneByOrFail({ id: deleteQuestionImageDto.questionImageId })
    await this.imageService.delete(questionImage.relativePath)
  }
}  