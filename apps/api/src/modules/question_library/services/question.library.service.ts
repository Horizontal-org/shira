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
      .leftJoin('question.apps', 'app')
      .select([
        'question.id',
        'question.name',
        'question.is_phising',
        'question.type',
        'language.name',
        'app.name',
      ])
      .where('question.type = :type', { type: 'demo' })
      .orderBy('question.name', 'ASC')
      .getRawMany();

    const libraryQuestions = rows.map((r: any) =>
      plainToInstance(QuestionLibraryDto, {
        id: r.question_id,
        name: r.question_name,
        isPhishing: Boolean(r.question_is_phising),
        type: r.question_type,
        language: r.language_name,
        appName: r.app_name,
      }),
    );

    return libraryQuestions;
  }
}