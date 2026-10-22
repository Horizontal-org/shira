import { Inject, Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { fileTypeFromBuffer } from "file-type";
import { formatISO } from "date-fns";
import { Question } from "src/modules/question/domain";
import { QuestionImage } from "src/modules/question_image/domain";
import { FileInvalidException } from "src/modules/question_image/exceptions";
import { QuestionSanitizer } from "src/utils/question-sanitizer.util";
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";
import { TYPES as TYPES_IMAGE } from "src/modules/image/interfaces";
import { ITransferTemplateImagesService, TransferableImage } from "src/modules/image/interfaces/services/transfer-template-images.service.interface";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const DOWNLOAD_TIMEOUT_MS = 10_000

// Template image URLs come from the client, so only download from the configured
// library images base URL (same origin and path prefix) to prevent SSRF.
function isAllowedTemplateImageUrl(url: string): boolean {
  const baseUrl = process.env.SHIRA_LIBRARY_IMAGES_URL?.trim()
  if (!baseUrl) return false

  let base: URL
  let target: URL
  try {
    base = new URL(baseUrl)
    target = new URL(url)
  } catch {
    return false
  }

  const basePath = base.pathname.endsWith("/") ? base.pathname : `${base.pathname}/`
  return target.origin === base.origin && target.pathname.startsWith(basePath)
}

export function remapImageIds(content: string, imageIdMap: Map<number, number>): string {
  let remapped = content;
  for (const [oldId, newId] of imageIdMap) {
    remapped = remapped.replace(new RegExp(`data-image-id="${oldId}"`, "g"), `data-image-id="${newId}"`);
  }
  return remapped;
}

function cleanString(input: string): string {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
}

@Injectable()
export class TransferTemplateImagesService implements ITransferTemplateImagesService {
  constructor(
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) { }

  async transferImages(
    manager: EntityManager,
    quizId: number,
    question: Question,
    images: TransferableImage[],
    referencedContent: string[],
  ): Promise<Map<number, number>> {
    const referencedIds = new Set<number>();
    for (const content of referencedContent) {
      for (const id of QuestionSanitizer.extractImageIds(content)) {
        referencedIds.add(Number(id));
      }
    }

    const imageIdMap = new Map<number, number>();

    for (const image of images) {
      if (!referencedIds.has(image.id)) continue;

      const buffer = image.buffer ?? await this.downloadImageBuffer(image.url);

      const type = await fileTypeFromBuffer(buffer);
      if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) {
        throw new FileInvalidException();
      }

      const name = `${formatISO(new Date())}_${cleanString(image.name)}`;
      const relativePath = `question-images/${quizId}/${name}`;

      await this.imageService.upload({
        file: { buffer, size: buffer.length } as Express.Multer.File,
        filePath: relativePath,
        fileName: name,
      });

      const questionImage = manager.create(QuestionImage, {
        name: image.name,
        relativePath,
        question,
        quizId,
      });
      const savedImage = await manager.save(QuestionImage, questionImage);

      imageIdMap.set(image.id, savedImage.id);
    }

    return imageIdMap;
  }

  private async downloadImageBuffer(url: string): Promise<Buffer> {
    const response = await this.safeFetch(url)
    return this.readBodyWithSizeLimit(response, MAX_IMAGE_SIZE_BYTES)
  }

  private async readBodyWithSizeLimit(response: Response, maxBytes: number): Promise<Buffer> {
    const chunks: Uint8Array[] = []
    let total = 0
    const reader = response.body.getReader()
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        total += value.byteLength
        if (total > maxBytes) {
          await reader.cancel()
          throw new FileInvalidException()
        }
        chunks.push(value)
      }
    } catch {
      throw new FileInvalidException()
    }

    return Buffer.concat(chunks)
  }

  private async safeFetch(url: string): Promise<Response> {
    if (!isAllowedTemplateImageUrl(url)) {
      throw new FileInvalidException()
    }

    let response: Response
    try {
      response = await fetch(url, {
        redirect: "error",
        signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
      })
    } catch {
      throw new FileInvalidException()
    }

    const contentLength = Number(response.headers.get("content-length") ?? 0)
    if (!response.ok || !response.body || contentLength > MAX_IMAGE_SIZE_BYTES) {
      await response.body?.cancel().catch(() => undefined)
      throw new FileInvalidException()
    }

    return response
  }
}
