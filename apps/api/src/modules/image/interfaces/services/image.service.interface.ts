export interface ImageParams {
  file: Express.Multer.File
  filePath?: string
}

export interface IImageService {
  upload(params: ImageParams): void;
  get(name): void;
  delete(name): void;
  copyAndDeleteOrigin(originPath: string, destinationPath: string)
}
