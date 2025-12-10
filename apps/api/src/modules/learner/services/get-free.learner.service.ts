import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, IsNull, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { GenericErrorException } from "../exceptions";
import { Learner as LearnerEntity} from "../domain/learner.entity";
import { GetLearnersQuizzesDto } from "../dto/get.learner-quiz.dto";
import { ApiLogger } from "../logger/api-logger.service";
import { IGetFreeLearnerService } from "../interfaces/services/get-free.learner.service.interface";
import { GetFreeLearnersDto } from "../dto/get-free.learner.dto";

@Injectable()
export class GetFreeLearnerService implements IGetFreeLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  private readonly logger = new ApiLogger(GetFreeLearnerService.name);

  async execute(quizId: number, spaceId: number): Promise<GetFreeLearnersDto[]> {
    let learnerQuizzes = []
    try {
      learnerQuizzes = await this.learnerRepo
        .createQueryBuilder('learners')
        .leftJoin('learners_quizzes', 'lq',     'lq.learnerId = learners.id')
        .select([
          'lq.status',
          'lq.quizId',
          'learners.email',
          'learners.name',
          'learners.id',
          'learners.invitedAt'
        ])
        .where("learners.spaceId = :spaceId", { spaceId: spaceId })
        .andWhere(new Brackets(qb => {
          qb.where('lq.quizId IS NULL')
            .orWhere('lq.quizId <> :quizId', { quizId })
        }))
        .getMany()
    } catch(e) {
      this.logger.error('Error while getting learners-quizzes :' + e)
      throw new GenericErrorException()
    }

    const parsed = plainToInstance(GetFreeLearnersDto, learnerQuizzes.map((l) => {
      return {
        id: l.id,
        email: l.email,
        name: l.name,
        invitedAt: l.invitedAt
      }
    }), { excludeExtraneousValues: true })
    
    return parsed
  }
}