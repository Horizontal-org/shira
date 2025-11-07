import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { SendInvitationAuthService } from "src/modules/auth/services/send-invitation.auth.service";
import { InviteEmailLearnerDto } from "../dto/invitation-email.learner.dto";

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    private readonly sendInvitationAuthService: SendInvitationAuthService
  ) { }

  async sendInvitationEmail(inviteEmailLearnerDto: InviteEmailLearnerDto) {
    const { email, spaceId } = inviteEmailLearnerDto;

    console.debug("🚀 ~ InviteLearnerService ~ sendInvitationEmail ~ email:", email, "spaceId:", spaceId);

    await this.sendInvitationAuthService.execute({
      email,
      slug: 'learner-invitation' //TODO check
    });
  }

  async invite(inviteLearnerDto: InviteLearnerDto) {
    const { email, spaceId, name, assignedByUser } = inviteLearnerDto;

    console.debug("🚀 ~ InviteLearnerService ~ invite ~ email:", email, "spaceId:", spaceId);

    const learner = new LearnerEntity();
    learner.email = email;
    learner.name = name;
    learner.spaceId = spaceId;
    learner.status = 'invited';
    learner.assignedByUser = assignedByUser ? assignedByUser : null;

    await this.learnerRepo.save(learner);
  }
}