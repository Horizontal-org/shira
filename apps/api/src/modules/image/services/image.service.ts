import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectMinio } from '../decorators/minio.decorator';
import * as Minio from 'minio';
import { IImageService } from '../interfaces/services/image.service.interface';

@Injectable()
export class ImageService implements IImageService {
  
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
    )
  }

  public async bulkGet(images) {
    const promises = images.map(i =>
      this.minioService.presignedUrl(
        'GET',
        this._bucketName,
        i.path,
      )
      .then(url => ({ ...i, url }))
      .catch(error => ({ ...i, error }))
    )

    try {
      const results = await Promise.all(promises);
      return results
    } catch (e) {
      console.log("🚀 ~ ImageService ~ bulkGet ~ e:", e)
      throw new ServiceUnavailableException()
    }

  }

  public async upload(params): Promise<void> {    
    return new Promise((resolve, reject) => {

      const filePath = params.filePath ?  params.filePath : `orphan-images/${params.fileName}`;
      
      this.minioService.putObject(
        this._bucketName,
        filePath,
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
  
  public async delete(imagePath: string): Promise<void> {
    console.log("🚀 ~ ImageService ~ delete ~ imagePath:", imagePath)
    try {
      await this.minioService.removeObject(
        this._bucketName,
        imagePath
      )
    } catch (e) {
      console.log("🚀 ~ ImageService ~ delete ~ e:", e)
      throw new ServiceUnavailableException()
    }
  }


  public async copyAndDeleteOrigin(originPath: string, destinationPath: string) {
    const conds = new Minio.CopyConditions()

    await this.minioService.copyObject(
      this._bucketName,
      destinationPath,
      `/${this._bucketName}/${originPath}`,
      conds
    )
  }
}
