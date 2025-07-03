import { TYPES } from './interfaces';
import { ImageService } from './services/image.service';


export const imageServiceProvider = {
  provide: TYPES.services.IImageService,
  useClass: ImageService,
};


export const servicesImageProviders = [
  imageServiceProvider
];
