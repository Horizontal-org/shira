import { TYPES } from './interfaces';
import { ImageService } from './services/image.service';
import { TransferTemplateImagesService } from './services/transfer-template-images.service';


export const imageServiceProvider = {
  provide: TYPES.services.IImageService,
  useClass: ImageService,
};

export const transferTemplateImagesServiceProvider = {
  provide: TYPES.services.ITransferTemplateImagesService,
  useClass: TransferTemplateImagesService,
};


export const servicesImageProviders = [
  imageServiceProvider,
  transferTemplateImagesServiceProvider
];
