export interface ImageParams {
  file: Express.Multer.File
  filePath: string
  fileName: string
}

export interface ImageResponse {
  path: string; 
  imageId: number;
  url?: string;
}

export interface IImageService {
  upload(params: ImageParams): Promise<void>;
  get(name): Promise<string>;
  bulkGet(images: ImageResponse[]): void
  delete(name: string): Promise<void>;
  copyAndDeleteOrigin(originPath: string, destinationPath: string)
}
