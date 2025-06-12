import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionImage as QuestionImageEntity } from '../domain';
import { CreateQuestionImageDto } from '../dto/create.question_image.dto';
import { ICreateQuestionImageService } from '../interfaces/services/create.question_image.service.interface';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces';
@Injectable()
export class CreateQuestionImageService implements ICreateQuestionImageService{

  constructor(
    @InjectRepository(QuestionImageEntity)
    private readonly questionImageRepo: Repository<QuestionImageEntity>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async execute (createQuestionImageDto: CreateQuestionImageDto) {

    const filePath = this.createFilePath(createQuestionImageDto)
    const questionImage = new QuestionImageEntity()

    questionImage.name = createQuestionImageDto.file.originalname
    questionImage.relativePath = filePath
    questionImage.quizId = createQuestionImageDto.quizId

    if (createQuestionImageDto.questionId) {
      questionImage.questionId = createQuestionImageDto.questionId
    }

    await this.questionImageRepo.save(questionImage)

    return this.imageService.upload({
      file: createQuestionImageDto.file,
      filePath: filePath
    })
  }

  private createFilePath(createQuestionImageDto: CreateQuestionImageDto) {
    const name = createQuestionImageDto.file.originalname
    return `question-images/${createQuestionImageDto.quizId}/${createQuestionImageDto.questionId ? createQuestionImageDto.questionId + '/' : ''}${name}`
  }
}