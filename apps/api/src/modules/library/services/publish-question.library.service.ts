import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { TYPES } from '../interfaces'
import { IPublishQuestionLibraryService } from '../interfaces/services/publish-question.library.service.interface'
import { IPrepareQuestionsLibraryService } from '../interfaces/services/prepare-questions.library.service.interface'
import { IShiraLibraryService } from '../interfaces/services/shira-library.service.interface'
import { PublishQuestionLibraryDto } from '../dto/publish-question.library.dto'

@Injectable()
export class PublishQuestionLibraryService implements IPublishQuestionLibraryService {
  constructor(
    @Inject(TYPES.services.IPrepareQuestionsLibraryService)
    private readonly prepareQuestionsService: IPrepareQuestionsLibraryService,
    @Inject(TYPES.services.IShiraLibraryService)
    private readonly shiraLibraryService: IShiraLibraryService,
  ) { }

  async execute(dto: PublishQuestionLibraryDto): Promise<void> {
    const {
      questionId,
      spaceId,
      author,
      templateName,
      templateDescription,
      langTagIds,
      tagIds
    } = dto

    const question = await this.prepareQuestionsService.getQuestion(questionId, spaceId)

    if (!question) {
      throw new NotFoundException('Question not found')
    }

    const readyQuestion = {
      ...await this.prepareQuestionsService.prepareQuestionForPublishing(question),
      author,
      langTagIds,
      tagIds
    }

    await this.shiraLibraryService.publishQuestion(readyQuestion)
  }
}
