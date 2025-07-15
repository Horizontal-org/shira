import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as Minio from 'minio';
import { MINIO_TOKEN } from './decorators/minio.decorator';
import { imageServiceProvider, servicesImageProviders } from './image.provider';
import { imageControllers } from './controllers';

@Global()
@Module({
  controllers: [
    ...imageControllers
  ],
  exports: [
    MINIO_TOKEN,
    imageServiceProvider
  ],
  providers: [
    {
      provide: MINIO_TOKEN,
      useFactory: async (
      ): Promise<Minio.Client> => {
        const client = new Minio.Client({
          endPoint: process.env.IMAGE_ENDPOINT,
          port: parseInt(process.env.IMAGE_PORT),
          accessKey: process.env.IMAGE_ACCESS_KEY,
          secretKey: process.env.IMAGE_SECRET_KEY,
          useSSL: true,
          region: 'garage'
        });
        return client;
      },
    },
    ...servicesImageProviders
  ],
})
export class ImageModule {}
