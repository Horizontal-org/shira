import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IGetLearnerQuizService } from "../interfaces/services/get.learner-quiz.service.interface";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { TYPES as QUIZ_TYPES } from "src/modules/quiz/interfaces";
import { IGetByHashQuizService } from "src/modules/quiz/interfaces/services/get-by-hash.quiz.service.interface";
import { AlreadyCompletedException, NotConfirmedException } from '../exceptions'
import { ApiLogger } from "../logger/api-logger.service";

@Injectable()
export class GetLearnerQuizService implements IGetLearnerQuizService {
  constructor(
    @InjectRepository(LearnerQuizEntity)
    private readonly learnerQuizRepo: Repository<LearnerQuizEntity>,
    @Inject(QUIZ_TYPES.services.IGetByHashQuizService)
    private readonly getQuizByHash: IGetByHashQuizService,
  ) { }

  private logger = new ApiLogger(GetLearnerQuizService.name);

  async execute(hash: string) {
    const learnerQuiz = await this.learnerQuizRepo.findOneOrFail({
      where: { hash: hash },
      relations: ['quiz', 'learner']
    })

    if (learnerQuiz.learner.status !== 'registered') {
      throw new NotConfirmedException(learnerQuiz.learnerId.toString());
    }

    if (learnerQuiz.status === 'completed') {
      throw new AlreadyCompletedException(learnerQuiz.quizId.toString(), learnerQuiz.learnerId.toString());
    }

    this.logger.log(`Retrieved learner quiz with ID: ${learnerQuiz.id}
      for learner ID: ${learnerQuiz.learner.id}`)

    const quiz = await this.getQuizByHash.execute(learnerQuiz.quiz.hash, 'private')

    return {
      learnerQuiz: {
        learnerEmail: learnerQuiz.learner.email,
        learnerId: learnerQuiz.learner.id,
        status: learnerQuiz.status
      },
      quiz
    }
  }
}