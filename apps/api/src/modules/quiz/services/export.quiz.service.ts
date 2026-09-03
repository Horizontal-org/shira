import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as archiver from 'archiver';
import { Quiz } from '../domain/quiz.entity';
import { SpaceExportQuestionService } from 'src/modules/question/services/spaceExport.question.service';

@Injectable()
export class ExportQuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly spaceExportQuestionService: SpaceExportQuestionService,
  ) {}

  async export({ id, spaceId, res }: { id: number; spaceId: number; res }) {
    const quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.quizQuestions', 'quizQuestions')
      .leftJoinAndSelect('quizQuestions.question', 'question')
      .leftJoinAndSelect('question.apps', 'apps')
      .leftJoinAndSelect('question.questionTranslations', 'questionTranslations')
      .leftJoinAndSelect('question.images', 'images')
      .leftJoinAndSelect('question.explanations', 'explanations')
      .leftJoinAndSelect('explanations.explanationTranslations', 'explanationTranslations')
      .where('quiz.id = :id', { id })
      .andWhere('quiz.space_id = :spaceId', { spaceId })
      .getOne();

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const orderedQuestions = (quiz.quizQuestions ?? []).sort(
      (a, b) => a.position - b.position,
    );

    const metadata = {
      title: quiz.title,
      questions: orderedQuestions.map((qq) => ({
        id: qq.question.id,
        name: qq.question.name,
        position: qq.position,
      })),
    };

    const fileName = this.slugify(quiz.title);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}.zip"`,
    );

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });

    for (const qq of orderedQuestions) {
      const { metadata: qMetadata, contentHtml, assets } =
        await this.spaceExportQuestionService.buildQuestionPackage(qq.question);
      const folder = `questions/${qq.position}_${this.slugify(qq.question.name)}`;

      archive.append(JSON.stringify(qMetadata, null, 2), { name: `${folder}/metadata.json` });
      archive.append(contentHtml, { name: `${folder}/content.html` });
      for (const asset of assets) {
        archive.append(asset.buffer, { name: `${folder}/assets/${asset.fileName}` });
      }
    }

    await archive.finalize();
  }

  private slugify(name: string) {
    return (name || 'quiz').replace(/[^a-zA-Z0-9_-]+/g, '_');
  }
}
