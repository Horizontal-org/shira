import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { TYPES } from '../interfaces'
import { IPublishQuestionLibraryService } from '../interfaces/services/publish-question.library.service.interface'
import { IPrepareQuestionsLibraryService } from '../interfaces/services/prepare-questions.library.service.interface'
import { PublishQuestionLibraryDto } from '../dto/publish-question.library.dto'
import { LibraryPublishFailedException } from '../exceptions'

@Injectable()
export class PublishQuestionLibraryService implements IPublishQuestionLibraryService {
  constructor(
    @Inject(TYPES.services.IPrepareQuestionsLibraryService)
    private readonly prepareQuestionsService: IPrepareQuestionsLibraryService,
  ) { }

  async execute(dto: PublishQuestionLibraryDto): Promise<void> {
    const {
      questionId,
      spaceId,
      author,
      langTagIds,
      tagIds
    } = dto

    const question = await this.prepareQuestionsService.getQuestion(questionId, spaceId)

    if (!question) {
      throw new NotFoundException('Question not found')
    }

    const readyQuestion = {
      ...this.prepareQuestionsService.prepareQuestionForPublishing(question),
      author,
      langTagIds,
      tagIds
    }

    console.log("🚀 ~ PublishQuestionLibraryService ~ execute ~ readyQuestion:", readyQuestion)

    await this.publishQuestion(readyQuestion)
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
