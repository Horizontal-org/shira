import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { TYPES } from '../interfaces'
import { IPublishQuestionLibraryService } from '../interfaces/services/publish-question.library.service.interface'
import { IPrepareQuestionsLibraryService } from '../interfaces/services/prepare-questions.library.service.interface'
import { IShiraLibraryService } from '../interfaces/services/shira-library.service.interface'
import { ILibraryAuthService } from '../interfaces/services/library-auth.library.service.interface'
import { PublishQuestionLibraryDto } from '../dto/publish-question.library.dto'

@Injectable()
export class PublishQuestionLibraryService implements IPublishQuestionLibraryService {
  constructor(
    @Inject(TYPES.services.IPrepareQuestionsLibraryService)
    private readonly prepareQuestionsService: IPrepareQuestionsLibraryService,
    @Inject(TYPES.services.IShiraLibraryService)
    private readonly shiraLibraryService: IShiraLibraryService,
    @Inject(TYPES.services.ILibraryAuthService)
    private readonly libraryAuthService: ILibraryAuthService,
  ) { }

  async execute(dto: PublishQuestionLibraryDto): Promise<void> {
    const {
      questionId,
      space,
      spaceDisplayName,
      organizationName,
      templateName,
      templateDescription,
      langTagIds,
      tagIds
    } = dto

    const apiKey = await this.libraryAuthService.getOrRegisterApiKey(space, spaceDisplayName, organizationName)

    const question = await this.prepareQuestionsService.getQuestion(questionId, space.id)

    if (!question) {
      throw new NotFoundException('Question not found')
    }

    const readyQuestion = {
      ...await this.prepareQuestionsService.prepareQuestionForPublishing(question, apiKey),
      name: templateName,
      description: templateDescription,
      langTagIds,
      tagIds
    }

    await this.shiraLibraryService.publishQuestion(readyQuestion, apiKey)
  }
}
