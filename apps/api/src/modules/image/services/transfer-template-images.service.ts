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
    console.log('ON TRANSFER TEMPLATE IMAGES SERVICE', { quizId, questionId: question.id, imagesCount: images.length, referencedContentCount: referencedContent.length });
    const referencedIds = new Set<number>();
    for (const content of referencedContent) {
      for (const id of QuestionSanitizer.extractImageIds(content)) {
        referencedIds.add(Number(id));
      }
    }

    const imageIdMap = new Map<number, number>();

    for (const image of images) {
      if (!referencedIds.has(image.id)) continue;

      const buffer = image.buffer ?? await this.downloadImageBuffer(image.url, image.id);

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

  private async downloadImageBuffer(url: string, id: number): Promise<Buffer> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download template image ${id}: ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }
}
