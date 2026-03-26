import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IGetLearnerQuizService } from "../interfaces/services/get.learner-quiz.service.interface";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { TYPES as QUIZ_TYPES } from "src/modules/quiz/interfaces";
import { IGetByHashQuizService } from "src/modules/quiz/interfaces/services/get-by-hash.quiz.service.interface";
import { AlreadyCompletedException, GenericErrorException, NotConfirmedException } from '../exceptions'
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { IValidateLearnerQuizService } from "../interfaces/services/validate.learner-quiz.service.interface";
import { plainToInstance } from "class-transformer";
import { GetLearnersQuizzesDto } from "../dto/get.learner-quiz.dto";

@Injectable()
export class ValidateLearnerQuizService implements IValidateLearnerQuizService {
  constructor(
    @InjectRepository(LearnerQuizEntity)
    private readonly learnerQuizRepo: Repository<LearnerQuizEntity>,
  ) { }

  private logger = new ApiLogger(ValidateLearnerQuizService.name);

  async execute(quizId: number, learnerId: number) {
    const learnerQuiz = await this.learnerQuizRepo.findOneOrFail({
      where: { quizId: quizId, learnerId: learnerId },
      relations: ['quiz']
    })

    if (learnerQuiz.status !== "assigned") {
      throw new GenericErrorException();
    }

    this.logger.log(`Retrieved learner quiz with ID: ${learnerQuiz.id}
      for learner ID: ${learnerQuiz.learner.id}`)


    return learnerQuiz
  }
}