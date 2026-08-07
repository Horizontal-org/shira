import { Inject, Injectable } from '@nestjs/common';

import { TYPES } from '../interfaces';
import { ICreateQuestionQuizService } from '../interfaces/services/create-question.quiz.service.interface';
import { IAddQuestionToQuizService } from '../interfaces/services/add-question-to-quiz.quiz.service.interface';
import { CreateQuestionQuizDto } from '../dto/create-question.quiz.dto';

@Injectable()
export class CreateQuestionQuizService implements ICreateQuestionQuizService {

  constructor(
    @Inject(TYPES.services.IAddQuestionToQuizService)
    private addQuestionToQuizService: IAddQuestionToQuizService,
  ) { }

  async execute(createQuestionDto: CreateQuestionQuizDto): Promise<void> {
    await this.addQuestionToQuizService.execute({
      quizId: createQuestionDto.quizId,
      name: createQuestionDto.question.name,
      content: createQuestionDto.question.content,
      isPhishing: createQuestionDto.question.isPhishing,
      app: { id: createQuestionDto.question.app },
      isFromTemplate: false,
      images: createQuestionDto.question.images,
      explanations: createQuestionDto.explanations,
    });
  }
}
