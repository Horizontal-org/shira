import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Note } from '../domain/note.entity'
import { IGetNoteService } from '../interfaces/services/get.note.service.interface'

@Injectable()
export class GetNoteService implements IGetNoteService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
  ) {}

  async execute(id: number): Promise<{ id: number; name: string; content: string }> {
    const note = await this.noteRepo.findOne({ where: { id } })

    if (!note) {
      throw new NotFoundException()
    }

    return { id: note.id, name: note.name, content: note.content }
  }
}
