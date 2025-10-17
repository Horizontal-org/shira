import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';

import { IDuplicateQuestionQuizService } from '../interfaces/services/duplicate-question.quiz.service.interface';
import { DuplicateQuestionQuizDto } from '../dto/duplicate-question.quiz.dto';
import { Question } from 'src/modules/question/domain';
import { TYPES } from '../interfaces';
import { ISharedQuestionDuplicationService } from '../interfaces/services/shared-question-duplication.service.interface';


@Injectable()
export class DuplicateQuestionQuizService implements IDuplicateQuestionQuizService{

  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @Inject(TYPES.services.ISharedQuestionDuplicationService)
    private sharedQuestionDuplicationService: ISharedQuestionDuplicationService,
    private dataSource: DataSource
  ) {}

  async execute (duplicateQuestionDto: DuplicateQuestionQuizDto) {
    console.log("🚀 ~ DuplicateQuestionQuizService ~ execute ~ duplicateQuestionDto:", duplicateQuestionDto)

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

      console.log("🚀 ~ DuplicateQuestionQuizService ~ execute ~ originalQuestion:", originalQuestion)

      if (!originalQuestion) {
        throw new Error('Question not found');
      }


  

      console.log("🚀 ~ originalQuestion.languageId:", originalQuestion.languageId);

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