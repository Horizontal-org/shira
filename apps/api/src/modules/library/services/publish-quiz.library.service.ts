import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Quiz } from 'src/modules/quiz/domain/quiz.entity'
import { TYPES } from '../interfaces'
import { IPublishQuizLibraryService } from '../interfaces/services/publish-quiz.library.service.interface'
import { IPrepareQuestionsLibraryService } from '../interfaces/services/prepare-questions.library.service.interface'
import { IShiraLibraryService } from '../interfaces/services/shira-library.service.interface'
import { PublishQuizLibraryDto } from '../dto/publish-quiz.library.dto'

@Injectable()
export class PublishQuizLibraryService implements IPublishQuizLibraryService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES.services.IPrepareQuestionsLibraryService)
    private readonly prepareQuestionsService: IPrepareQuestionsLibraryService,
    @Inject(TYPES.services.IShiraLibraryService)
    private readonly shiraLibraryService: IShiraLibraryService,
  ) { }

  async execute(dto: PublishQuizLibraryDto): Promise<void> {
    const {
      quizId,
      spaceId,
      author,
      langTagIds,
      tagIds
    } = dto

    const quiz = await this.quizRepo.findOne({ where: { id: quizId, space: { id: spaceId } } })

    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }

    const questions = await this.prepareQuestionsService.getQuestionsByQuizId(quizId, spaceId)

    if (questions.length === 0) {
      throw new NotFoundException('No questions found for quiz')
    }

    const readyQuiz = {
      title: quiz.title,
      questions: questions.map((question) => this.prepareQuestionsService.prepareQuestionForPublishing(question)),
      author,
      langTagIds,
      tagIds
    }

    await this.shiraLibraryService.publishQuiz(readyQuiz)
  }
}
