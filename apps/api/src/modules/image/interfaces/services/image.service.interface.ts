export interface ImageParams {
  file: Express.Multer.File
}

export interface IImageService {
  upload(params: ImageParams): void;
  get(name): void;
}
