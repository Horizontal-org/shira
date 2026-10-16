import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as archiver from 'archiver';
import { Quiz } from '../domain/quiz.entity';
import { QuizItem } from '../domain/quiz_items.entity';
import { SpaceExportQuestionService } from 'src/modules/question/services/spaceExport.question.service';
import { TYPES } from '../interfaces';
import { IQuizItemsService } from '../interfaces/services/quiz-items.service.interface';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces';
import * as cheerio from 'cheerio';
import * as path from 'path';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class ExportQuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly spaceExportQuestionService: SpaceExportQuestionService,
    @Inject(TYPES.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) {}

  async export({ id, spaceId, res }: { id: number; spaceId: number; res }) {
    const quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.quizQuestions', 'quizQuestions')
      .where('quiz.id = :id', { id })
      .andWhere('quiz.space_id = :spaceId', { spaceId })
      .getOne();

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const hydratedItems = await this.quizItemsService.hydrate(
      (quiz.quizQuestions ?? []) as QuizItem[],
      {
        questionRelations: ['apps', 'questionTranslations', 'images', 'explanations', 'explanations.explanationTranslations'],
        noteRelations: ['images'],
      },
    );

    const orderedQuestions = hydratedItems
      .filter((item) => item.entityType === 'question')
      .sort((a, b) => a.position - b.position);
    const orderedNotes = hydratedItems
      .filter((item) => item.entityType === 'note' && item.note)
      .sort((a, b) => a.position - b.position);

    const metadata = {
      title: quiz.title,
      questions: orderedQuestions.map((qq) => ({
        id: qq.question.id,
        name: qq.question.name,
        position: qq.position,
      })),
      notes: orderedNotes.map((item) => ({
        id: item.note.id,
        name: item.note.name,
        position: item.position,
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

    for (const item of orderedNotes) {
      const assets = await Promise.all((item.note.images ?? []).map(async (noteImage) => {
        const buffer = await this.imageService.download(noteImage.relativePath);
        let ext = path.extname(noteImage.name);
        if (!ext) {
          const type = await fileTypeFromBuffer(buffer);
          ext = type ? `.${type.ext}` : '';
        }
        return { imageId: noteImage.id, fileName: `${noteImage.id}${ext}`, buffer };
      }));
      const fileNameById = new Map(assets.map((asset) => [asset.imageId, asset.fileName]));
      const $ = cheerio.load(item.note.content);
      for (const el of $('img').toArray()) {
        const assetName = fileNameById.get(parseInt($(el).attr('data-image-id'), 10));
        if (assetName) $(el).attr('src', `assets/${assetName}`);
      }
      const folder = `notes/${item.position}_${this.slugify(item.note.name)}`;
      archive.append($('body').html() ?? '', { name: `${folder}/content.html` });
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
