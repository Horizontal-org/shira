import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "src/modules/quiz/domain/quiz.entity";
import { Repository } from "typeorm";
import { IGetOrganizationService } from "../interfaces/services/get.organization.service.interface";
import { OrganizationEntity } from "../domain/organization.entity";

@Injectable()
export class OrganizationService implements IGetOrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) { }

  async execute(id: number): Promise<OrganizationEntity> {
    const organization = await this.organizationRepo.findOne({
      where: { id },
      relations: [
        'spaces',
        'organizationUsers',
        'organizationUsers.user',
        'organizationUsers.role',
        'organizationSubscriptions',
        'organizationSubscriptions.subscription',
      ],
    });

    const spaceIds = (organization.spaces ?? []).map(s => s.id);
    if (spaceIds.length === 0) return organization;

    const quizRunsBySpace = await this.quizRepo
      .createQueryBuilder('quiz')
      .leftJoin(
        'quiz_runs',
        'run',
        'run.quiz_id = quiz.id'
      )
      .select('quiz.space_id', 'spaceId')
      .addSelect('COUNT(DISTINCT quiz.id)', 'totalQuizzes')
      .addSelect('COUNT(run.started_at)', 'runsCount')
      .addSelect('SUM(run.finished_at IS NOT NULL)', 'finishedRunsCount')
      .addSelect('MAX(run.finished_at)', 'lastFinishedAt')
      .where('quiz.space_id IN (:...spaceIds)', { spaceIds })
      .groupBy('quiz.space_id')
      .getRawMany()

    organization.spaces = organization.spaces.map(space => {
      return {
        ...space,
        stats: quizRunsBySpace.find(qr => qr.spaceId === space.id) || null
      }
    });

    return organization;
  }

}
