import { Injectable } from '@nestjs/common';
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

    const results = await Promise.all(promises);
    console.log("🚀 ~ ImageService ~ bulkGet ~ results:", results)
    return results
  }

  public async upload(params) {    
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
  
  public async delete(imagePath: string) {
    await this.minioService.removeObject(
      this._bucketName,
      imagePath
    )
  }

  public async copyAndDeleteOrigin(originPath: string, destinationPath: string) {
    const conds = new Minio.CopyConditions()
    
    await this.minioService.copyObject(
      this._bucketName, 
      originPath, 
      `/${this._bucketName}/${destinationPath}`,
      conds
    )
  }
}
