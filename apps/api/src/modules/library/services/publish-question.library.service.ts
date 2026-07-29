import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Question } from 'src/modules/question/domain'
import { Language } from 'src/modules/languages/domain/languages.entity'
import { IPublishQuestionLibraryService } from '../interfaces/services/publish-question.library.service.interface'
import { PublishQuestionLibraryDto } from '../dto/publish-question.library.dto'
import { LibraryPublishFailedException } from '../exceptions'

@Injectable()
export class PublishQuestionLibraryService implements IPublishQuestionLibraryService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async execute(dto: PublishQuestionLibraryDto): Promise<void> {
    const {
      questionId,
      spaceId,
      author,
      langTagIds,
      tagIds
    } = dto

    const question = await this.getQuestion(questionId, spaceId)

    if (!question) {
      throw new NotFoundException('Question not found')
    }

    const readyQuestion = {
      ...this.prepareQuestionForPublishing(question),
      author,
      langTagIds,
      tagIds
    }

    console.log("🚀 ~ PublishQuestionLibraryService ~ execute ~ readyQuestion:", readyQuestion)

    await this.publishQuestion(readyQuestion)
  }

  private async getQuestion(questionId: number, spaceId: number) {
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
      ])
      .where('question.id = :id', { id: questionId })
      .andWhere('question.type = :type', { type: 'quiz' })
      .andWhere('space.id = :spaceId', { spaceId })
      .getOne()
  }

  private prepareQuestionForPublishing(question: Question) {
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

    return {
      name: question.name,
      isPhishing: Boolean(question.isPhising),
      content: qt.content,
      defaultApp: firstApp.name,
      appType: firstApp.type,
      explanations,
    }
  }

  private async publishQuestion(data): Promise<void> {
    const baseUrl = process.env.SHIRA_LIBRARY_URL

    if (!baseUrl) {
      throw new LibraryPublishFailedException()
    }

    let response: Response

    try {
      response = await fetch(`${baseUrl}/question-templates/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log("🚀 ~ PublishQuestionLibraryService ~ publishQuestion ~ error:", error)
      throw new LibraryPublishFailedException(error.message)
    }

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("🚀 ~ PublishQuestionLibraryService ~ publishQuestion ~ error:", response.status, errorBody)
      throw new LibraryPublishFailedException(errorBody)
    }
  }
}
