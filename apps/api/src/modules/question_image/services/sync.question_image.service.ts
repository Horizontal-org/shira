import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { QuestionImage as QuestionImageEntity } from '../domain';
import { ISyncQuestionImageService } from '../interfaces/services/sync.question_image.service.interface';
import { SyncQuestionImageDto } from '../dto/sync.question_image.dto';
import { TYPES as TYPES_IMAGE } from '../../image/interfaces'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class SyncQuestionImageService implements ISyncQuestionImageService{

  constructor(
    @InjectRepository(QuestionImageEntity)
    private readonly questionImageRepo: Repository<QuestionImageEntity>,
    @InjectQueue('images')
    private imagesQueue: Queue
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

      console.log(!syncQuestionImages.imageIds.includes(qi.id + ''), qi.questionId)
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
      quizImages
        .filter(qi => toDelete.includes(qi.id))
        .forEach((qi) => {
          // ADD TO QUEUE DELETES FROM BUCKET
          this.imagesQueue.add('delete', qi.relativePath)
        })        

      await this.questionImageRepo.delete(  
        { id: In(toDelete) },
      )
    }

  }

}