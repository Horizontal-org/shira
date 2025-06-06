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
    return this.imageService.upload({
      file: createQuestionImageDto.file
    })
    // const quiz = new QuizEntity()
    // quiz.title = createQuizDto.title
    // quiz.space = createQuizDto.space
    // quiz.hash = crypto.randomBytes(20).toString('hex') 
    
    // await this.questionImageRepo.save(quiz)
  }
}