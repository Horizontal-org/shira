import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Quiz } from 'src/modules/quiz/domain/quiz.entity'
import { TYPES } from '../interfaces'
import { IPublishQuizLibraryService } from '../interfaces/services/publish-quiz.library.service.interface'
import { IPrepareQuestionsLibraryService } from '../interfaces/services/prepare-questions.library.service.interface'
import { IShiraLibraryService } from '../interfaces/services/shira-library.service.interface'
import { ILibraryAuthService } from '../interfaces/services/library-auth.library.service.interface'
import { PublishQuizLibraryDto } from '../dto/publish-quiz.library.dto'
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces'
import { IQuizItemsService } from 'src/modules/quiz/interfaces/services/quiz-items.service.interface'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface'
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util'

@Injectable()
export class PublishQuizLibraryService implements IPublishQuizLibraryService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES.services.IPrepareQuestionsLibraryService)
    private readonly prepareQuestionsService: IPrepareQuestionsLibraryService,
    @Inject(TYPES.services.IShiraLibraryService)
    private readonly shiraLibraryService: IShiraLibraryService,
    @Inject(TYPES.services.ILibraryAuthService)
    private readonly libraryAuthService: ILibraryAuthService,
    @Inject(TYPES_QUIZ.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) { }

  async execute(dto: PublishQuizLibraryDto): Promise<void> {
    const {
      quizId,
      space,
      spaceDisplayName,
      organizationName,
      templateName,
      templateDescription,
      langTagIds,
      tagIds
    } = dto

    const apiKey = await this.libraryAuthService.getOrRegisterApiKey(space, spaceDisplayName, organizationName)

    const quiz = await this.quizRepo.findOne({
      where: { id: quizId, space: { id: space.id } },
      relations: ['quizQuestions'],
    })

    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }

    const hydratedItems = await this.quizItemsService.hydrate(quiz.quizQuestions ?? [], {
      questionRelations: ['apps', 'questionTranslations', 'images', 'explanations', 'explanations.explanationTranslations'],
      noteRelations: ['images'],
    })
    const questionItems = hydratedItems.filter((item) => item.entityType === 'question' && item.question)

    if (questionItems.length === 0) {
      throw new NotFoundException('No questions found for quiz')
    }

    const preparedQuestions = await Promise.all(
      questionItems.map(async (item) => {
        const prepared = await this.prepareQuestionsService.prepareQuestionForPublishing(item.question, apiKey)
        return prepared ? { ...prepared, position: item.position } : null
      }),
    )

    const notes = await Promise.all(
      hydratedItems
        .filter((item) => item.entityType === 'note' && item.note)
        .map(async (item) => {
          const referencedIds = new Set(QuestionSanitizer.extractImageIds(item.note.content).map(Number))
          const imageIdMap = new Map<number, number>()
          for (const image of item.note.images ?? []) {
            if (!referencedIds.has(image.id)) continue
            const buffer = await this.imageService.download(image.relativePath)
            const uploaded = await this.shiraLibraryService.uploadImage(buffer, image.name, apiKey)
            imageIdMap.set(image.id, uploaded.id)
          }
          let content = item.note.content
          for (const [oldId, newId] of imageIdMap) {
            content = content.replace(new RegExp(`data-image-id="${oldId}"`, 'g'), `data-image-id="${newId}"`)
          }
          return {
            name: item.note.name,
            content,
            position: item.position,
            templateImageIds: [...imageIdMap.values()],
          }
        }),
    )

    const readyQuiz = {
      title: templateName,
      description: templateDescription,
      questions: preparedQuestions.filter((question) => question !== null),
      notes,
      langTagIds,
      tagIds
    }

    await this.shiraLibraryService.publishQuiz(readyQuiz, apiKey)
  }
}
