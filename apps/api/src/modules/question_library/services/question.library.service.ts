import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';
import { plainToInstance } from 'class-transformer';
import { QuestionLibraryDto } from '../dto/question.library.dto';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute(): Promise<QuestionLibraryDto[]> {
    const rows = await this.questionRepo
      .createQueryBuilder('question')
      .leftJoin('languages', 'language', 'language.id = question.language_id')
      .leftJoin('question.apps', 'apps')
      .select([
        'question.id',
        'question.name',
        'question.is_phising',
        'question.type',
        'language.name',
        'apps.name'
      ])
      .where('question.type = :type', { type: 'demo' })
      .orderBy('question.name', 'ASC')
      .getRawMany();

    const libraryQuestions = plainToInstance(
      QuestionLibraryDto,
      rows.map((r) => ({
        id: r.question_id,
        name: r.question_name,
        isPhishing: r.is_phising,
        type: r.question_type,
        language: r.language_name,
        appName: r.apps_name,
      })),
    );

    return libraryQuestions;
  }
}
