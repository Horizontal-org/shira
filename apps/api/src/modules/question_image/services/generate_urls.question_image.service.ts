import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionImage as QuestionImageEntity } from '../domain';
import { CreateQuestionImageDto } from '../dto/create.question_image.dto';
import { CreateQuestionImageServiceResponse, ICreateQuestionImageService } from '../interfaces/services/create.question_image.service.interface';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces';
import { IGenerateUrlsQuestionImageService } from '../interfaces/services/generate_urls.question_image.service.interface';
import { GenerateUrlsQuestionImageDto } from '../dto/generate_urls.question_image.dto';
import { ReadQuestionImageDto } from '../dto/read.question_image.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GenerateUrlsQuestionImageService implements IGenerateUrlsQuestionImageService{

  constructor(
    @InjectRepository(QuestionImageEntity)
    private readonly questionImageRepo: Repository<QuestionImageEntity>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async byQuiz(quizId: number): Promise<ReadQuestionImageDto> {
    const quizImages = await this.questionImageRepo
      .createQueryBuilder('question_images')
      .where('quiz_id = :quizId', { quizId: quizId })
      .andWhere('question_id IS NOT NULL')
      .getMany()  

    return await this.generate(quizImages)
  }

  async byQuestion(questionId: number): Promise<ReadQuestionImageDto> {
    const questionImages = await this.questionImageRepo
      .createQueryBuilder('question_images')
      .where('question_id = :questionId', { questionId: questionId })
      .andWhere('question_id IS NOT NULL')
      .getMany()  

    return await this.generate(questionImages)
  }

  private async generate(questionImages: QuestionImageEntity[]): Promise<ReadQuestionImageDto> {
    const images = await this.imageService.bulkGet(questionImages.map((qi) => {
      return {
        path: qi.relativePath,
        imageId: qi.id
      }
    }))

    return await plainToInstance(ReadQuestionImageDto, images);
  }

}