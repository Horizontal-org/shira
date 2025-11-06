import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  async execute(inviteLearnerDto: InviteLearnerDto) {
    console.log("🚀 ~ inviteLearnerService ~ execute ~ inviteLearnerDto:", inviteLearnerDto);

    const { email, spaceId, name, assignedBy } = inviteLearnerDto;

    const learner = new LearnerEntity();
    learner.email = email;
    learner.name = name;
    learner.spaceId = spaceId;
    learner.status = 'invited';
    learner.assignedByUser = assignedBy ? assignedBy : null;

    await this.learnerRepo.save(learner);
  }
}