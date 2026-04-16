import { Inject, Injectable } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionImage as QuestionImageEntity } from '../domain';
import { CreateQuestionImageDto } from '../dto/create.question_image.dto';
import { CreateQuestionImageServiceResponse, ICreateQuestionImageService } from '../interfaces/services/create.question_image.service.interface';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces';
import { formatISO } from 'date-fns';
import { FileInvalidException } from '../exceptions';
@Injectable()
export class CreateQuestionImageService implements ICreateQuestionImageService{

  constructor(
    @InjectRepository(QuestionImageEntity)
    private readonly questionImageRepo: Repository<QuestionImageEntity>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async execute (createQuestionImageDto: CreateQuestionImageDto): Promise<CreateQuestionImageServiceResponse> {
    
    await this.validateFile(createQuestionImageDto.file)

    const fileInfo = await this.createFilePath(createQuestionImageDto)
    const questionImage = new QuestionImageEntity()

    questionImage.name = fileInfo.name
    questionImage.relativePath = fileInfo.path
    questionImage.quizId = createQuestionImageDto.quizId

    if (createQuestionImageDto.questionId) {
      questionImage.questionId = createQuestionImageDto.questionId
    }

    const savedQI = await this.questionImageRepo.save(questionImage)

    await this.imageService.upload({
      file: createQuestionImageDto.file,
      fileName: fileInfo.name,
      filePath: fileInfo.path
    })

    return {
      imageId: savedQI.id,
      url: await this.imageService.get(fileInfo.path)
    }
  }

  private async validateFile(file: Express.Multer.File) {
    const type = await fileTypeFromBuffer(file.buffer);

    if (!type || !['image/jpeg', 'image/png', 'image/webp'].includes(type.mime)) {
      throw new FileInvalidException()
    }
  }

  private async createFilePath(createQuestionImageDto: CreateQuestionImageDto) {    
    const now = formatISO(new Date())
    // let name = now + '_' + Buffer.from(createQuestionImageDto.file.originalname, 'utf-8').toString('utf8')
    let name = now + '_' + this.cleanString(createQuestionImageDto.file.originalname)
    console.log("🚀 ~ CreateQuestionImageService ~ createFilePath ~ name:", name)
    let path = `question-images/${createQuestionImageDto.quizId}/${name}`
        
    return {
      path,
      name
    }
  }

  private cleanString(input) {
      var output = "";
      for (var i=0; i<input.length; i++) {
          if (input.charCodeAt(i) <= 127) {
              output += input.charAt(i);
          }
      }
      return output;
  }
}
