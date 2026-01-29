import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';

import { IDuplicateQuestionQuizService } from '../interfaces/services/duplicate-question.quiz.service.interface';
import { DuplicateQuestionQuizDto } from '../dto/duplicate-question.quiz.dto';
import { Question } from 'src/modules/question/domain';
import { TYPES } from '../interfaces';
import { ISharedQuestionDuplicationService } from '../interfaces/services/shared-question-duplication.service.interface';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';

@Injectable()
export class DuplicateQuestionQuizService implements IDuplicateQuestionQuizService {

  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @Inject(TYPES.services.ISharedQuestionDuplicationService)
    private sharedQuestionDuplicationService: ISharedQuestionDuplicationService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService,
    private dataSource: DataSource
  ) { }

  private readonly logger = new ApiLogger(DuplicateQuestionQuizService.name);

  async execute(duplicateQuestionDto: DuplicateQuestionQuizDto, spaceId: number) {
    this.logger.log(`Starting duplication of question ID ${duplicateQuestionDto.questionId} in quiz ID ${duplicateQuestionDto.quizId} for space ID ${spaceId}`);

    await this.validateSpaceQuizService.execute(spaceId, duplicateQuestionDto.quizId);

    return this.dataSource.transaction(async manager => {
      const originalQuestion = await manager.findOne(Question, {
        where: { id: duplicateQuestionDto.questionId },
        relations: [
          'apps',
          'explanations',
          'questionTranslations',
          'images',
          'explanations.explanationTranslations'
        ],
      });

      this.logger.log(`Original question: ${originalQuestion ? originalQuestion.id : 'not found'}`);

      if (!originalQuestion) {
        throw new Error('Question not found');
      }

      this.logger.log(`Original question language ID: ${originalQuestion.languageId}`);

      const duplicatedQuestion = await this.sharedQuestionDuplicationService.duplicateQuestion({
        originalQuestion,
        newQuestionName: `Copy of ${originalQuestion.name}`,
        targetQuizId: duplicateQuestionDto.quizId,
        manager
      });

      const originalQQ = await this.quizQuestionRepo
        .findOne({ where: { quizId: duplicateQuestionDto.quizId, questionId: duplicateQuestionDto.questionId } });

      const oldPositions = (await manager.find(QuizQuestionEntity, { where: { quizId: duplicateQuestionDto.quizId } })).filter(o => o.position > originalQQ.position)
      await manager.save(QuizQuestionEntity, oldPositions.map((oldp) => {
        return {
          ...oldp,
          position: oldp.position + 1
        }
      }));

      const quizQuestion = this.quizQuestionRepo.create({
        position: originalQQ.position + 1,
        quizId: duplicateQuestionDto.quizId,
        questionId: duplicatedQuestion.question.id
      });
      await manager.save(QuizQuestionEntity, quizQuestion);
    });
  }
}
