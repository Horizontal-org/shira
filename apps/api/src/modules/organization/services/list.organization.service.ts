import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrganizationEntity } from "../domain/organization.entity";
import { IListOrganizationService } from "../interfaces/services/list.organization.service.interface";

@Injectable()
export class ListOrganizationService implements IListOrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
  ) { }

  async execute(): Promise<OrganizationEntity[]> {
    const organizations = await this.organizationRepo
      .createQueryBuilder('organization')
      .innerJoin('spaces', 'space', 'space.organization_id = organization.id')
      .innerJoin('organizations_users', 'orgUser', 'orgUser.organization_id = organization.id')
      .innerJoin('users', 'user', 'user.id = orgUser.user_id')
      .leftJoin('quizzes', 'quiz', 'quiz.space_id = space.id')
      .leftJoin('quiz_runs', 'run', 'run.quiz_id = quiz.id')
      .select([
        'organization.id',
        'organization.name'
      ])
      .addSelect('COUNT(DISTINCT quiz.id)', 'totalQuizzes')
      .addSelect('COUNT(run.started_at)', 'runsCount')
      .addSelect('MAX(user.last_login_at)', 'lastLogin')
      .groupBy('space.id')
      .getRawMany()
  
    return organizations
  }

}
