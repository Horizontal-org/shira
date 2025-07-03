import { Body, Controller, Get, Inject, Param } from '@nestjs/common';
import { TYPES as TYPES_IMAGE } from '../../image/interfaces';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';

// TODO DOUBTH
@Controller('i')
export class GetImageController {

 constructor(
  @Inject(TYPES_IMAGE.services.IImageService)
  private imageService: IImageService
) {}
 
  @Get('url/:name')
  async getFile(
    @Param('name') name: string
  ) {
    console.log('here')
    // /question-images/test-filename.png 
    // return this.imageService.get(name)
    return await this.imageService.get('/question-images/test-filename.png')
  }
}  