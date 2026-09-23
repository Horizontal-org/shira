import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, EntityManager, In, Repository } from 'typeorm'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { NoteImage as NoteImageEntity } from '../domain'
import { ISyncNoteImageService } from '../interfaces/services/sync.note_image.service.interface'
import { SyncNoteImageDto } from '../dto/sync.note_image.dto'

@Injectable()
export class SyncNoteImageService implements ISyncNoteImageService {

  constructor(
    @InjectRepository(NoteImageEntity)
    private readonly noteImageRepo: Repository<NoteImageEntity>,
    @InjectQueue('images')
    private imagesQueue: Queue
  ) { }

  async execute(syncNoteImages: SyncNoteImageDto, manager?: EntityManager): Promise<void> {
    const repo = manager ? manager.getRepository(NoteImageEntity) : this.noteImageRepo

    const quizImages = await repo
      .createQueryBuilder('note_images')
      .where('quiz_id = :quizId', { quizId: syncNoteImages.quizId })
      .andWhere(new Brackets(qb => {
        qb.where('note_id = :noteId', { noteId: syncNoteImages.noteId })
          .orWhere('note_id IS NULL')
      }))
      .getMany()

    const toUpdate = []
    const toDelete = []

    quizImages.forEach(ni => {
      if (syncNoteImages.imageIds.includes(ni.id + '') && !ni.noteId) {
        // attach to note
        toUpdate.push(ni.id)
      }

      if (!syncNoteImages.imageIds.includes(ni.id + '') && ni.noteId) {
        // removed from note content
        toDelete.push(ni.id)
      }
    })

    if (toUpdate.length > 0) {
      await repo.update(
        { id: In(toUpdate) },
        { noteId: syncNoteImages.noteId }
      )
    }

    if (toDelete.length > 0) {
      quizImages
        .filter(ni => toDelete.includes(ni.id))
        .forEach((ni) => {
          this.imagesQueue.add('delete', ni.relativePath)
        })

      await repo.delete({ id: In(toDelete) })
    }
  }

  // rows are removed by the FK cascade when the note is deleted, this only cleans the bucket
  async deleteByNote(noteId: number): Promise<void> {
    const noteImages = await this.noteImageRepo.find({ where: { noteId } })

    noteImages.forEach((ni) => {
      this.imagesQueue.add('delete', ni.relativePath)
    })
  }
}
