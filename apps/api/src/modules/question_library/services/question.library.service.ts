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
      .leftJoin('question.explanations', 'e')
      .select([
        'question.id',
        'question.name',
        'question.is_phising',
        'question.type',
        'question.content',
        'language.name',
        'app.name',
        'e.explanation_position',
        'e.explanation_text',
        'e.explanation_index',
      ])
      .where('question.type = :type', { type: 'demo' })
      .orderBy('question.name', 'ASC')
      .getRawMany();

    const byId = new Map<number, QuestionLibraryDto & { explanations: { position: number; text: string; index: number }[] }>();
    for (const r of rows as any[]) {
      const id: number = r.question_id;

      if (!byId.has(id)) {
        byId.set(
          id,
          plainToInstance(QuestionLibraryDto, {
            id,
            name: r.question_name,
            isPhishing: Boolean(r.is_phising),
            content: r.question_content,
            type: r.question_type,
            language: r.language_name,
            appName: r.app_name,
            explanations: [],
          }) as any,
        );
      }

      if (r.explanation_index != null) {
        const question = byId.get(id)!;
        question.explanations.push({
          position: Number(r.explanation_position),
          text: r.explanation_text,
          index: Number(r.explanation_index),
        });
      }
    }

    const libraryQuestions = Array.from(byId.values()).map((question) => ({
      ...question,
      explanations: question.explanations.sort((a, b) => a.index - b.index),
    }));
    return libraryQuestions as QuestionLibraryDto[];
  }
}