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

    const raw = await this.quizRepo
      .createQueryBuilder('quiz')
      .select('quiz.space_id', 'spaceId')
      .addSelect('COUNT(quiz.id)', 'total')
      .where('quiz.space_id IN (:...spaceIds)', { spaceIds })
      .groupBy('quiz.space_id')
      .getRawMany<{ spaceId: string; total: string }>();

    const counts = new Map(raw.map(r => [Number(r.spaceId), Number(r.total)]));
    organization.spaces = organization.spaces.map(s => ({ ...s, totalQuizzes: counts.get(s.id) ?? 0 })) as any;
    return organization;
  }

}
