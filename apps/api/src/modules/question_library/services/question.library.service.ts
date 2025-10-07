import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';
import { QuestionLibraryDto } from '../dto/question.library.dto';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  async execute(): Promise<QuestionLibraryDto[]> {
    const rows = await this.questionRepo.createQueryBuilder('question')
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

    if (rows.length === 0) return [];

    // group by question_id
    const byId = new Map<
      number,
      QuestionLibraryDto & {
        explanations: { position: number; text: string; index: number }[];
      }
    >();

    for (const row of rows) {
      const id = row.question_id;

      if (!byId.has(id)) {
        byId.set(id, {
          id,
          name: row.question_name,
          isPhishing: Boolean(row.is_phising),
          type: row.question_type,
          content: row.question_content,
          language: row.language_name,
          appName: row.app_name,
          explanations: [],
        });
      }

      if (row.explanation_index != null) {
        const q = byId.get(id)!;
        q.explanations.push({
          position: Number(row.explanation_position),
          text: row.explanation_text as string,
          index: Number(row.explanation_index),
        });
      }
    }

    // return sorted explanations per question
    return Array.from(byId.values()).map((q) => ({
      ...q,
      explanations: q.explanations.sort((a, b) => a.index - b.index),
    }));
  }
}