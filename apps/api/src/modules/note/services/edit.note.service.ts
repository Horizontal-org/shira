import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../domain/note.entity';
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';
import { IEditNoteService } from '../interfaces/services/edit.note.service.interface';
import { EditNoteDto } from '../dto/edit.note.dto';

@Injectable()
export class EditNoteService implements IEditNoteService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
  ) {}

  async execute(editNoteDto: EditNoteDto): Promise<void> {
    const note = await this.noteRepo.findOne({ where: { id: editNoteDto.noteId } });

    if (!note) {
      throw new NotFoundException();
    }

    note.name = editNoteDto.name;
    note.content = QuestionSanitizer.sanitizeQuestionContent(editNoteDto.content);
    note.updatedAt = new Date();

    await this.noteRepo.save(note);
  }
}
