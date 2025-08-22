import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionImage as QuestionImageEntity } from '../domain';
import { CreateQuestionImageDto } from '../dto/create.question_image.dto';
import { CreateQuestionImageServiceResponse, ICreateQuestionImageService } from '../interfaces/services/create.question_image.service.interface';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces';
import { formatISO } from 'date-fns';
@Injectable()
export class CreateQuestionImageService implements ICreateQuestionImageService{

  constructor(
    @InjectRepository(QuestionImageEntity)
    private readonly questionImageRepo: Repository<QuestionImageEntity>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async execute (createQuestionImageDto: CreateQuestionImageDto): Promise<CreateQuestionImageServiceResponse> {
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

  private async createFilePath(createQuestionImageDto: CreateQuestionImageDto) {    
    const now = formatISO(new Date())
    let name = now + '_' + Buffer.from(createQuestionImageDto.file.originalname).toString('latin1')
    let path = `question-images/${createQuestionImageDto.quizId}/${name}`
        
    return {
      path,
      name
    }
  }
}