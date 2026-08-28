import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as archiver from 'archiver';
import { fileTypeFromBuffer } from 'file-type';
import { Question } from '../domain';
import { QuestionImage } from 'src/modules/question_image/domain';
import { QuizQuestion } from 'src/modules/quiz/domain/quizzes_questions.entity';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces';

interface Asset {
  fileName: string;
  buffer: Buffer;
}

@Injectable()
export class SpaceExportQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) {}

  async export({ id, spaceId, res }: { id: number; spaceId: number; res }) {
    const owned = await this.quizQuestionRepository
      .createQueryBuilder('qq')
      .innerJoin('qq.quiz', 'quiz')
      .where('qq.questionId = :id', { id })
      .andWhere('quiz.space_id = :spaceId', { spaceId })
      .getCount();

    if (!owned) {
      throw new NotFoundException('Question not found');
    }

    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['apps', 'images'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const metadata = {
      name: question.name,
      app: question.apps?.[0]?.name ?? null,
      isPhishing: !!question.isPhising,
    };

    const { contentHtml, assets } = await this.buildContent(question);

    const fileName = this.slugify(question.name);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}.zip"`,
    );

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });
    archive.append(contentHtml, { name: 'content.html' });
    for (const asset of assets) {
      archive.append(asset.buffer, { name: `assets/${asset.fileName}` });
    }

    await archive.finalize();
  }

  private async buildContent(question: Question) {
    const $ = cheerio.load(question.content || '');
    const images = question.images ?? [];
    const assets: Asset[] = [];
    const assetFileNameByImageId = new Map<number, string>();

    for (const el of $('img').toArray()) {
      const src = $(el).attr('src');
      if (!src) continue;

      let decodedSrc = src;
      try {
        decodedSrc = decodeURIComponent(src);
      } catch {
        decodedSrc = src;
      }

      const match = images.find((qi) => decodedSrc.includes(qi.name));
      if (!match) continue;

      const assetFileName = await this.resolveAssetFileName(
        match,
        assetFileNameByImageId,
        assets,
      );
      $(el).attr('src', `assets/${assetFileName}`);
    }

    const contentHtml = $('body').html() ?? '';
    return { contentHtml, assets };
  }

  private async resolveAssetFileName(
    match: QuestionImage,
    assetFileNameByImageId: Map<number, string>,
    assets: Asset[],
  ) {
    const cached = assetFileNameByImageId.get(match.id);
    if (cached) return cached;

    const buffer = await this.imageService.download(match.relativePath);
    let ext = path.extname(match.name);
    if (!ext) {
      const type = await fileTypeFromBuffer(buffer);
      ext = type ? `.${type.ext}` : '';
    }

    const assetFileName = `${match.id}${ext}`;
    assetFileNameByImageId.set(match.id, assetFileName);
    assets.push({ fileName: assetFileName, buffer });

    return assetFileName;
  }

  private slugify(name: string) {
    return (name || 'question').replace(/[^a-zA-Z0-9_-]+/g, '_');
  }
}
