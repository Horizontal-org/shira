import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { SendInvitationAuthService } from "src/modules/auth/services/send-invitation.auth.service";
import { InviteEmailLearnerDto } from "../dto/invitation-email.learner.dto";
import { EmailSendFailedException } from "../exceptions/email-send.learner.exception";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";

const UNIQUE_VIOLATION_CODE = '23505';

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    private readonly sendInvitationAuthService: SendInvitationAuthService,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) { }

  async invite(inviteLearnerDto: InviteLearnerDto) {
    const { email, spaceId, name, assignedByUser } = inviteLearnerDto;

    console.debug("InviteLearnerService ~ invite ~ email:", email, "spaceId:", spaceId);

    const learner = new LearnerEntity();
    learner.email = email;
    learner.name = name;
    learner.spaceId = spaceId;
    learner.status = 'invited';
    learner.assignedByUser = assignedByUser ? assignedByUser : null;

    try {
      await this.learnerRepo.save(learner);
    } catch (err) {
      console.error('InviteLearnerService ~ error saving learner', { email, spaceId, err });

      if (err.code === UNIQUE_VIOLATION_CODE) throw new ConflictLearnerException();

      throw new SaveLearnerException();
    }
  }

  async sendInvitationEmail(inviteEmailLearnerDto: InviteEmailLearnerDto) {
    const { email, spaceId } = inviteEmailLearnerDto;

    console.debug("InviteLearnerService ~ sendInvitationEmail ~ email:", email, "spaceId:", spaceId);

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to create a Shira space',
        template: 'learner-invitation',
        data: {
          email: email,
          // magicLink: magicLink,
          // passphrase: passphrase.code
        }
      })
    } catch (err) {
      console.error('InviteLearnerService ~ error sending learner invitation email', { email, spaceId, err });
      throw new EmailSendFailedException();
    }
  }
}