import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { QuestionImage as QuestionImageEntity } from '../domain';
import { ISyncQuestionImageService } from '../interfaces/services/sync.question_image.service.interface';
import { SyncQuestionImageDto } from '../dto/sync.question_image.dto';
import { TYPES as TYPES_IMAGE } from '../../image/interfaces'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';

@Injectable()
export class SyncQuestionImageService implements ISyncQuestionImageService{

  constructor(
    @InjectRepository(QuestionImageEntity)
    private readonly questionImageRepo: Repository<QuestionImageEntity>,
    // @Inject(TYPES_IMAGE.services.IImageService)
    // private imageService: IImageService
  ) {}

  async execute (syncQuestionImages: SyncQuestionImageDto): Promise<void> {

    const quizImages = await this.questionImageRepo
      .createQueryBuilder('question_images')
      .where('quiz_id = :quizId ', { quizId: syncQuestionImages.quizId })      
      .andWhere(new Brackets(qb => {
        qb.where("question_id = :questionId", { questionId: syncQuestionImages.questionId })
          .orWhere("question_id IS NULL")
        })
      )
      .getMany()
  
    let toUpdate = []
    let toDelete = []
   
    quizImages.forEach(qi => {
      if (syncQuestionImages.imageIds.includes(qi.id + '') && !qi.questionId) {
        // update with new question id
        toUpdate.push(qi.id)
      }

      console.log(!syncQuestionImages.imageIds.includes(qi.id + ''))
      console.log(qi.questionId)
      if (!syncQuestionImages.imageIds.includes(qi.id + '') && qi.questionId) {
        // delete
        toDelete.push(qi.id)
      }
    })

    if (toUpdate.length > 0) {
      await this.questionImageRepo.update(
        { id: In(toUpdate) },
        { questionId: syncQuestionImages.questionId }
      )
    }

    if (toDelete.length > 0 ) {     
      //TODO BUCKET DELETE HERE
      await this.questionImageRepo.delete(  
        { id: In(toDelete) },
      )
    }

  }

}