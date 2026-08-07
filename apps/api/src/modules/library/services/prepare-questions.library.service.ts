import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'

import { Question } from 'src/modules/question/domain'
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { TYPES } from '../interfaces'
import { IShiraLibraryService } from '../interfaces/services/shira-library.service.interface'
import { IPrepareQuestionsLibraryService } from '../interfaces/services/prepare-questions.library.service.interface'

@Injectable()
export class PrepareQuestionsLibraryService implements IPrepareQuestionsLibraryService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
    @Inject(TYPES.services.IShiraLibraryService)
    private readonly shiraLibraryService: IShiraLibraryService,
  ) { }

  async getQuestion(questionId: number, spaceId: number): Promise<Question> {
    return this.baseQuery()
      .where('question.id = :id', { id: questionId })
      .andWhere('question.type = :type', { type: 'quiz' })
      .andWhere('space.id = :spaceId', { spaceId })
      .getOne()
  }

  async getQuestionsByQuizId(quizId: number, spaceId: number): Promise<Question[]> {
    return this.baseQuery()
      .where('quiz.id = :quizId', { quizId })
      .andWhere('question.type = :type', { type: 'quiz' })
      .andWhere('space.id = :spaceId', { spaceId })
      .getMany()
  }

  async prepareQuestionForPublishing(question: Question, apiKey: string) {
    if (!question.apps || question.apps.length === 0) return null

    const firstApp = question.apps[0]
    const [qt] = question.questionTranslations

    const explanations = question.explanations.map((explanation) => {
      const [explanationTranslation] = explanation.explanationTranslations

      return {
        position: explanation.position,
        index: Number(explanation.index),
        content: explanationTranslation.content,
      }
    })

    const imageIdMap = await this.transferReferencedImages(qt.content, explanations, question.images ?? [], apiKey)

    return {
      name: question.name,
      isPhishing: Boolean(question.isPhising),
      content: this.remapImageIds(qt.content, imageIdMap),
      defaultApp: firstApp.name,
      appType: firstApp.type,
      explanations: explanations.map((explanation) => ({
        ...explanation,
        content: this.remapImageIds(explanation.content, imageIdMap),
      })),
      templateImageIds: [...imageIdMap.values()],
    }
  }

  private async transferReferencedImages(
    questionContent: string,
    explanations: { content: string }[],
    images: { id: number; name: string; relativePath: string }[],
    apiKey: string,
  ): Promise<Map<number, number>> {
    const referencedIds = new Set<number>()
    for (const id of QuestionSanitizer.extractImageIds(questionContent)) {
      referencedIds.add(Number(id))
    }
    for (const explanation of explanations) {
      for (const id of QuestionSanitizer.extractImageIds(explanation.content)) {
        referencedIds.add(Number(id))
      }
    }

    const imageIdMap = new Map<number, number>()

    for (const id of referencedIds) {
      const image = images.find((i) => i.id === id)
      if (!image) continue

      const buffer = await this.imageService.download(image.relativePath)
      const uploaded = await this.shiraLibraryService.uploadImage(buffer, image.name, apiKey)
      imageIdMap.set(id, uploaded.id)
    }

    return imageIdMap
  }

  private remapImageIds(content: string, imageIdMap: Map<number, number>): string {
    let remapped = content
    for (const [oldId, newId] of imageIdMap) {
      remapped = remapped.replace(new RegExp(`data-image-id="${oldId}"`, 'g'), `data-image-id="${newId}"`)
    }
    return remapped
  }

  private baseQuery(): SelectQueryBuilder<Question> {
    return this.questionRepo
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionTranslations', 'qt')
      .leftJoinAndSelect('qt.languageId', 'qtLang')
      .leftJoinAndSelect('question.apps', 'app')
      .leftJoinAndSelect('question.explanations', 'explanation')
      .leftJoinAndSelect('explanation.explanationTranslations', 'explanationTranslation')
      .leftJoinAndSelect('explanationTranslation.languageId', 'etLang')
      .leftJoinAndSelect('question.quizQuestions', 'quizQuestion')
      .leftJoinAndSelect('quizQuestion.quiz', 'quiz')
      .leftJoinAndSelect('quiz.space', 'space')
      .leftJoinAndSelect('question.images', 'image')
      .select([
        'question.id',
        'question.name',
        'question.type',
        'question.createdAt',
        'question.isPhising',
        'qt.id',
        'qt.content',
        'qtLang.id',
        'qtLang.code',
        'qtLang.name',
        'app.id',
        'app.name',
        'app.type',
        'explanation.id',
        'explanation.position',
        'explanation.index',
        'explanationTranslation.id',
        'explanationTranslation.content',
        'etLang.id',
        'etLang.code',
        'etLang.name',
        'quizQuestion.id',
        'quiz.id',
        'space.id',
        'space.name',
        'image.id',
        'image.name',
        'image.relativePath',
      ])
  }
}
