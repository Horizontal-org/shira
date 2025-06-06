import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectMinio } from '../decorators/minio.decorator';
import * as Minio from 'minio';

@Injectable()
export class ImageService {
  
  protected _bucketName = process.env.IMAGE_BUCKET;
  
  constructor(
    @InjectMinio() 
    private readonly minioService: Minio.Client
  ) {}

  public async get(name) {
   return await this.minioService.presignedUrl(
      'GET',
      this._bucketName,
      name,
    );
  }

  public async upload(params) {
    return new Promise((resolve, reject) => {

      // TODO get name 
      const filename = `question-images/test-filename.png`;
      
      this.minioService.putObject(
        this._bucketName,
        filename,
        params.file.buffer,
        params.file.size,
        (error, objInfo) => {
          if (error) {
            reject(error);
          } else {
            resolve(objInfo);
          }
        },
      );
    });
  }
  

  //TODO Move and Delete
}
