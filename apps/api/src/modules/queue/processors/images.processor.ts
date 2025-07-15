import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { TYPES as TYPES_IMAGES } from '../../image/interfaces';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';


@Processor('images')
export class ImagesProcessor extends WorkerHost {

    constructor(  
      @Inject(TYPES_IMAGES.services.IImageService)
      private imageService: IImageService,
    ) {
      super()
    }

    async process(job: Job<any, any, string>): Promise<any> {
      switch (job.name) {
        case 'delete': {
          console.log('DELETE IMAGE', job.data)
          await this.imageService.delete(job.data)
        }
      }
    }

}
