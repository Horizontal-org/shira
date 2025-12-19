import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { GenericErrorException } from "../exceptions";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { ApiLogger } from "../logger/api-logger.service";
import { IGetUnassignedLearnerService } from "../interfaces/services/get-unassigned.learner.service.interface";
import { GetUnassignedLearnersDto } from "../dto/get-unassigned.learner.dto";

@Injectable()
export class GetUnassignedLearnerService implements IGetUnassignedLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  private readonly logger = new ApiLogger(GetUnassignedLearnerService.name);

  async execute(quizId: number, spaceId: number): Promise<GetUnassignedLearnersDto[]> {
    let learnerQuizzes = []
    try {
      learnerQuizzes = await this.learnerRepo
        .createQueryBuilder('learners')
        .leftJoin('learners_quizzes', 'lq', 'lq.learnerId = learners.id')
        .select([
          'lq.status',
          'lq.quizId',
          'learners.email',
          'learners.name',
          'learners.id',
          'learners.invitedAt',
          'learners.status'
        ])
        .where("learners.spaceId = :spaceId", { spaceId: spaceId })
        .andWhere("learners.status = :status", { status: 'registered' })
        .andWhere(new Brackets(qb => {
          qb.where('lq.quizId IS NULL')
            .orWhere('lq.quizId <> :quizId', { quizId })
        }))
        .getMany()
    } catch (e) {
      this.logger.error('Error while getting learners-quizzes', e)
      throw new GenericErrorException()
    }

    const parsed = plainToInstance(GetUnassignedLearnersDto, learnerQuizzes.map((l) => {
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