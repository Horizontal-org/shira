export interface ImageParams {
  file: Express.Multer.File
  filePath: string
  fileName: string
}

export interface IImageService {
  upload(params: ImageParams): void;
  get(name): string;
  bulkGet(images: Array<{ path: string; imageId: number }>): void
  delete(name): void;
  copyAndDeleteOrigin(originPath: string, destinationPath: string)
}
