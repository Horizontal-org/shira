import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import * as path from 'path'
import * as crypto from 'crypto'
import { Quiz } from '../domain/quiz.entity'
import { QuizItem } from '../domain/quiz_items.entity'
import { TYPES } from '../interfaces'
import { IAddQuestionToQuizService } from '../interfaces/services/add-question-to-quiz.quiz.service.interface'
import { IImportQuizService, ImportQuizParams } from '../interfaces/services/import.quiz.service.interface'
import { Note } from 'src/modules/note/domain'
import { NoteImage } from 'src/modules/note_image/domain'
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { remapImageIds } from 'src/modules/image/services/transfer-template-images.service'

@Injectable()
export class ImportQuizService implements IImportQuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES.services.IAddQuestionToQuizService)
    private readonly addQuestionToQuizService: IAddQuestionToQuizService,
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) { }

  async execute({ title, questions, items, space, visibility }: ImportQuizParams): Promise<number> {
    return this.quizRepo.manager.transaction(async (manager) => {
      const uniqueTitle = await this.resolveUniqueTitle(manager, title, space.id)

      const quiz = manager.create(Quiz, {
        title: uniqueTitle,
        space,
        visibility,
        hash: crypto.randomBytes(20).toString('hex'),
      })

      const savedQuiz = await manager.save(Quiz, quiz)

      const importItems = items ?? questions.map((question, index) => ({
        entityType: 'question' as const,
        position: index + 1,
        question,
      }))

      for (const item of importItems) {
        if (item.entityType === 'note') {
          const note = await manager.save(Note, manager.create(Note, {
            name: item.note.metadata.name,
            content: '',
          }))
          const imageIdMap = new Map<number, number>()
          for (const asset of item.note.assets) {
            const oldId = parseAssetImageId(asset.fileName)
            if (oldId === null) continue
            const name = `${crypto.randomUUID()}_${path.basename(asset.fileName)}`
            const relativePath = `note-images/${savedQuiz.id}/${name}`
            await this.imageService.upload({
              file: { buffer: asset.buffer, size: asset.buffer.length } as Express.Multer.File,
              fileName: name,
              filePath: relativePath,
            })
            const image = await manager.save(NoteImage, manager.create(NoteImage, {
              name,
              relativePath,
              noteId: note.id,
              quizId: savedQuiz.id,
            }))
            imageIdMap.set(oldId, image.id)
          }
          note.content = remapImageIds(
            QuestionSanitizer.sanitizeQuestionContent(item.note.contentHtml),
            imageIdMap,
          )
          await manager.save(Note, note)
          await manager.save(QuizItem, manager.create(QuizItem, {
            quizId: savedQuiz.id,
            entityType: 'note',
            entityId: note.id,
            position: item.position,
          }))
          continue
        }

        const question = item.question
        const images = question.assets
          .map((asset) => ({
            id: parseAssetImageId(asset.fileName),
            name: asset.fileName,
            buffer: asset.buffer,
          }))
          .filter((image): image is { id: number; name: string; buffer: Buffer } => image.id !== null)

        await this.addQuestionToQuizService.execute(
          {
            quizId: savedQuiz.id,
            name: question.metadata.name,
            content: question.contentHtml,
            isPhishing: question.metadata.isPhishing,
            app: { name: question.metadata.app },
            isFromTemplate: true,
            images,
            explanations: question.metadata.explanations,
          },
          manager,
        )
      }

      return savedQuiz.id
    })
  }

  private async resolveUniqueTitle(manager: EntityManager, title: string, spaceId: number): Promise<string> {
    const existing = await manager.findOne(Quiz, { where: { title, space: { id: spaceId } } })

    if (!existing) {
      return title
    }

    return this.resolveUniqueTitle(manager, `Copy of ${title}`, spaceId)
  }
}

function parseAssetImageId(fileName: string): number | null {
  const id = parseInt(path.basename(fileName, path.extname(fileName)), 10)
  return Number.isNaN(id) ? null : id
}
