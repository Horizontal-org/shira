import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import * as path from 'path'
import * as crypto from 'crypto'
import { Quiz } from '../domain/quiz.entity'
import { TYPES } from '../interfaces'
import { IAddQuestionToQuizService } from '../interfaces/services/add-question-to-quiz.quiz.service.interface'
import { IImportQuizService, ImportQuizParams } from '../interfaces/services/import.quiz.service.interface'

@Injectable()
export class ImportQuizService implements IImportQuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES.services.IAddQuestionToQuizService)
    private readonly addQuestionToQuizService: IAddQuestionToQuizService,
  ) {}

  async execute({ title, questions, space, visibility }: ImportQuizParams): Promise<number> {
    return this.quizRepo.manager.transaction(async (manager) => {
      const uniqueTitle = await this.resolveUniqueTitle(manager, title, space.id)

      const quiz = manager.create(Quiz, {
        title: uniqueTitle,
        space,
        visibility,
        hash: crypto.randomBytes(20).toString('hex'),
      })

      const savedQuiz = await manager.save(Quiz, quiz)

      for (const question of questions) {
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
