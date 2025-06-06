import { Body, Controller, Get, Inject, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { CreateQuestionImageService } from '../services/create.question_image.service';
import { TYPES } from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('question-image')
export class CreateQuestionImageController {

 constructor(
  @Inject(TYPES.services.ICreateQuestionImageService)
  private createQuestionImageService: CreateQuestionImageService
) {}
 
  @Post('upload')
  @Roles(Role.SpaceAdmin)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    console.log('here')
    return this.createQuestionImageService.execute({
      file: file,
      quizId: 1
    })
  }
}