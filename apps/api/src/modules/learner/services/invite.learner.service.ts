import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { Repository } from "typeorm";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>
  ) { }

  async execute(inviteLearnerDto: InviteLearnerDto) {
    console.log("🚀 ~ inviteLearnerService ~ execute ~ inviteLearnerDto:", inviteLearnerDto);

    const space = await this.spaceRepo.findOne({
      where: { id: inviteLearnerDto.spaceId },
    })

    const learner = new LearnerEntity();
    learner.email = inviteLearnerDto.email;
    learner.name = inviteLearnerDto.name;
    learner.space = space;

    await this.learnerRepo.save(learner);
  }
}