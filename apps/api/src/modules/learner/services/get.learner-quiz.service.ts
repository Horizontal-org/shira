import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { Repository } from "typeorm";
import { IGetLearnerQuizService } from "../interfaces/services/get.learner-quiz.service.interface";
import { LearnerQuiz as LearnerQuizEntity} from "../domain/learners_quizzes.entity";
import { Quiz as QuizEntity } from "src/modules/quiz/domain/quiz.entity";
import { TYPES as QUIZ_TYPES } from "src/modules/quiz/interfaces";
import { IGetByHashQuizService } from "src/modules/quiz/interfaces/services/get-by-hash.quiz.service.interface";

@Injectable()
export class GetLearnerQuizService implements IGetLearnerQuizService {
  constructor(
    @InjectRepository(LearnerQuizEntity)
    private readonly learnerQuizRepo: Repository<LearnerQuizEntity>,
    @Inject(QUIZ_TYPES.services.IGetByHashQuizService)
    private readonly getQuizByHash: IGetByHashQuizService,    
  ) { }

  async execute(hash: string) {
    const learnerQuiz = await this.learnerQuizRepo.findOne({ 
      where: { hash: hash },
      relations: ['quiz', 'learner']
    })

    // here maybe check status of learner ? pending decision...

    //check learner_quiz status
    if (learnerQuiz.status === 'completed') {
      throw new NotFoundException()
    }

    const quiz = await this.getQuizByHash.execute(learnerQuiz.quiz.hash)
    
    return {
      learner: learnerQuiz.learner,
      quiz
    }
  }
}