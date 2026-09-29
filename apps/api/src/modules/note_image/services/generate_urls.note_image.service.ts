import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { NoteImage as NoteImageEntity } from '../domain'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { IGenerateUrlsNoteImageService } from '../interfaces/services/generate_urls.note_image.service.interface'
import { ReadNoteImageDto } from '../dto/read.note_image.dto'

@Injectable()
export class GenerateUrlsNoteImageService implements IGenerateUrlsNoteImageService {

  constructor(
    @InjectRepository(NoteImageEntity)
    private readonly noteImageRepo: Repository<NoteImageEntity>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async byQuiz(quizId: number): Promise<ReadNoteImageDto[]> {
    const quizImages = await this.noteImageRepo
      .createQueryBuilder('note_images')
      .where('quiz_id = :quizId', { quizId })
      .andWhere('note_id IS NOT NULL')
      .getMany()

    return this.generate(quizImages)
  }

  async byNote(noteId: number): Promise<ReadNoteImageDto[]> {
    const noteImages = await this.noteImageRepo
      .createQueryBuilder('note_images')
      .where('note_id = :noteId', { noteId })
      .getMany()

    return this.generate(noteImages)
  }

  private async generate(noteImages: NoteImageEntity[]): Promise<ReadNoteImageDto[]> {
    const images = await this.imageService.bulkGet(noteImages.map((ni) => {
      return {
        path: ni.relativePath,
        imageId: ni.id
      }
    }))

    return plainToInstance(ReadNoteImageDto, images as unknown as ReadNoteImageDto[])
  }
}
