import { Inject, Injectable } from "@nestjs/common";
import { formatISO } from "date-fns";
import { fileTypeFromBuffer } from "file-type";
import { EntityManager } from "typeorm";
import { TYPES as TYPES_IMAGE } from "src/modules/image/interfaces";
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";
import {
  ITransferTemplateImagesService,
  TransferableImage,
} from "src/modules/image/interfaces/services/transfer-template-images.service.interface";
import { Note } from "src/modules/note/domain";
import { NoteImage } from "src/modules/note_image/domain";
import { Question } from "src/modules/question/domain";
import { QuestionImage } from "src/modules/question_image/domain";
import { FileInvalidException } from "src/modules/question_image/exceptions";
import { QuestionSanitizer } from "src/utils/question-sanitizer.util";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 10_000;

interface ValidatedImage {
  id: number;
  name: string;
  buffer: Buffer;
}
// Template image URLs come from the client, so only download from the configured
// library images base URL (same origin and path prefix) to prevent SSRF.
function isAllowedTemplateImageUrl(url: string): boolean {
  const baseUrl = process.env.SHIRA_LIBRARY_IMAGES_URL?.trim();
  if (!baseUrl) return false;

  try {
    const base = new URL(baseUrl);
    const target = new URL(url);
    const basePath = base.pathname.endsWith("/") ? base.pathname : `${base.pathname}/`;
    return target.origin === base.origin && target.pathname.startsWith(basePath);
  } catch {
    return false;
  }
}

function cleanString(input: string): string {
  return [...input].filter((character) => character.charCodeAt(0) <= 127).join("");
}

@Injectable()
export class TransferTemplateImagesService implements ITransferTemplateImagesService {
  constructor(
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) { }

  async transferQuestionImages(
    manager: EntityManager,
    quizId: number,
    question: Question,
    images: TransferableImage[],
    referencedContent: string[],
  ): Promise<Map<number, number>> {
    const validatedImages = await this.validateTemplateImages(images, referencedContent);
    const imageIdMap = new Map<number, number>();

    for (const image of validatedImages) {
      const { relativePath } = await this.uploadImage("question-images", quizId, image);
      const savedImage = await manager.save(QuestionImage, manager.create(QuestionImage, {
        name: image.name,
        relativePath,
        question,
        quizId,
      }));
      imageIdMap.set(image.id, savedImage.id);
    }

    return imageIdMap;
  }

  async transferNoteImages(
    manager: EntityManager,
    quizId: number,
    note: Note,
    images: TransferableImage[],
    referencedContent: string[],
  ): Promise<Map<number, number>> {
    const validatedImages = await this.validateTemplateImages(images, referencedContent);
    const imageIdMap = new Map<number, number>();

    for (const image of validatedImages) {
      const { name, relativePath } = await this.uploadImage("note-images", quizId, image);
      const savedImage = await manager.save(NoteImage, manager.create(NoteImage, {
        name,
        relativePath,
        noteId: note.id,
        quizId,
      }));
      imageIdMap.set(image.id, savedImage.id);
    }

    return imageIdMap;
  }

  private async validateTemplateImages(
    images: TransferableImage[],
    referencedContent: string[],
  ): Promise<ValidatedImage[]> {
    const referencedIds = new Set(
      referencedContent.flatMap((content) => QuestionSanitizer.extractImageIds(content).map(Number)),
    );
    const validatedImages: ValidatedImage[] = [];

    for (const image of images) {
      if (!referencedIds.has(image.id)) continue;

      const buffer = image.buffer ?? await this.downloadImageBuffer(image.url);
      if (buffer.length > MAX_IMAGE_SIZE_BYTES) throw new FileInvalidException();

      const type = await fileTypeFromBuffer(buffer);
      if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) throw new FileInvalidException();
      validatedImages.push({ id: image.id, name: image.name, buffer });
    }

    return validatedImages;
  }

  private async uploadImage(folder: string, quizId: number, image: ValidatedImage) {
    const name = `${formatISO(new Date())}_${cleanString(image.name)}`;
    const relativePath = `${folder}/${quizId}/${name}`;
    await this.imageService.upload({
      file: { buffer: image.buffer, size: image.buffer.length } as Express.Multer.File,
      filePath: relativePath,
      fileName: name,
    });
    return { name, relativePath };
  }

  private async downloadImageBuffer(url?: string): Promise<Buffer> {
    if (!url || !isAllowedTemplateImageUrl(url)) throw new FileInvalidException();

    let response: Response;
    try {
      response = await fetch(url, {
        redirect: "error",
        signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
      });
    } catch {
      throw new FileInvalidException();
    }

    const contentLength = Number(response.headers.get("content-length") ?? 0);
    if (!response.ok || !response.body || contentLength > MAX_IMAGE_SIZE_BYTES) {
      await response.body?.cancel().catch(() => undefined);
      throw new FileInvalidException();
    }

    const chunks: Uint8Array[] = [];
    let total = 0;
    const reader = response.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > MAX_IMAGE_SIZE_BYTES) {
          await reader.cancel();
          throw new FileInvalidException();
        }
        chunks.push(value);
      }
    } catch {
      throw new FileInvalidException();
    }

    return Buffer.concat(chunks);
  }
}
