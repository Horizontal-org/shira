import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { GenericErrorException } from "../exceptions";
import { IGetAssignedLearnerService } from "../interfaces/services/get-assigned.learner.service.interface";
import { LearnerQuiz as LearnerQuizEntity} from "../domain/learners_quizzes.entity";
import { GetLearnersQuizzesDto } from "../dto/get.learner-quiz.dto";
import { ApiLogger } from "../logger/api-logger.service";

@Injectable()
export class GetAssignedLearnerService implements IGetAssignedLearnerService {
  constructor(
    @InjectRepository(LearnerQuizEntity)
    private readonly learnerQuizRepo: Repository<LearnerQuizEntity>,
  ) { }

  private readonly logger = new ApiLogger(GetAssignedLearnerService.name);

  async execute(quizId: number) {
    let learnerQuizzes = []
    try {
      learnerQuizzes = await this.learnerQuizRepo
        .createQueryBuilder('lq')
        .leftJoin('lq.learner', 'learner')
        .select([
          'lq.status',
          'learner.email',
          'learner.name',
          'learner.id'
        ])
        .where('lq.quizId = :quizId', { quizId })
        .getMany()
    } catch(e) {
      this.logger.error('Error while getting learners-quizzes :' + e)
      throw new GenericErrorException()
    }

    const parsed = plainToInstance(GetLearnersQuizzesDto, learnerQuizzes.map((lq) => {
      return {
        id: lq.learner.id,
        email: lq.learner.email,
        name: lq.learner.name,
        status: lq.status
      }
    }), { excludeExtraneousValues: true })
    
    return parsed
  }
}