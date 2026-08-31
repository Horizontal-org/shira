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

export interface Asset {
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
      relations: [
        'apps',
        'images',
        'questionTranslations',
        'explanations',
        'explanations.explanationTranslations',
      ],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const { metadata, contentHtml, assets } = await this.buildQuestionPackage(question);

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

  async buildQuestionPackage(question: Question) {
    const { contentHtml, explanations, assets } = await this.buildContent(question);

    const metadata = {
      name: question.name,
      app: question.apps?.[0]?.name ?? null,
      isPhishing: !!question.isPhising,
      explanations,
    };

    return { metadata, contentHtml, assets };
  }

  private async buildContent(question: Question) {
    const assets = await Promise.all(
      (question.images ?? []).map((image) => this.resolveAsset(image)),
    );
    const assetFileNameById = new Map(
      assets.map((asset) => [asset.imageId, asset.fileName]),
    );

    const contentHtml = this.rewriteImageSrcs(this.resolveContent(question), assetFileNameById);
    const explanations = this.resolveExplanations(question);

    return { contentHtml, explanations, assets };
  }

  private rewriteImageSrcs(html: string, assetFileNameById: Map<number, string>): string {
    const $ = cheerio.load(html);
    for (const el of $('img').toArray()) {
      const imageId = parseInt($(el).attr('data-image-id'), 10);
      const assetFileName = assetFileNameById.get(imageId);
      if (assetFileName) {
        $(el).attr('src', `assets/${assetFileName}`);
      }
    }
    return $('body').html() ?? '';
  }

  private resolveExplanations(question: Question) {
    return (question.explanations ?? []).map((explanation) => ({
      position: explanation.position,
      index: explanation.index,
      text: explanation.explanationTranslations?.[0]?.content ?? '',
    }));
  }

  private async resolveAsset(image: QuestionImage): Promise<Asset & { imageId: number }> {
    const buffer = await this.imageService.download(image.relativePath);
    let ext = path.extname(image.name);
    if (!ext) {
      const type = await fileTypeFromBuffer(buffer);
      ext = type ? `.${type.ext}` : '';
    }

    return { imageId: image.id, fileName: `${image.id}${ext}`, buffer };
  }

  private resolveContent(question: Question): string {
    return question.questionTranslations?.[0]?.content ?? '';
  }

  private slugify(name: string) {
    return (name || 'question').replace(/[^a-zA-Z0-9_-]+/g, '_');
  }
}
