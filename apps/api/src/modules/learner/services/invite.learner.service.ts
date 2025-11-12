import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { InviteEmailLearnerDto } from "../dto/invitation-email.learner.dto";
import { EmailSendFailedException } from "../exceptions/email-send.learner.exception";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { createHash, randomBytes } from "crypto";
import { TokenConflictLearnerException } from "../exceptions/token-conflict.learner.exception";
import { NotFoundLearnerException } from "../exceptions";

const UNIQUE_VIOLATION_CODE = '23505';

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) { }

  async invite(inviteLearnerDto: InviteLearnerDto) {
    const { email, spaceId, name, assignedByUser } = inviteLearnerDto;

    console.debug("InviteLearnerService ~ create ~ email:", email, "spaceId:", spaceId);

    let learner = await this.learnerRepo.findOne({ where: { spaceId, email } });

    if (learner && learner.status === 'registered') {
      console.error('InviteLearnerService ~ create ~ learner already exists', { email, spaceId });
      throw new ConflictLearnerException();
    }

    const token = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');

    try {
      this.learnerRepo.create({
        email,
        name,
        spaceId,
        status: 'invited',
        invitedAt: new Date(),
        invitationToken: tokenHash,
        assignedByUser: assignedByUser ? assignedByUser : null
      });

      await this.learnerRepo.save(learner);
    } catch (err) {
      console.error('InviteLearnerService ~ create ~ error saving learner', { email, spaceId, err });

      if (err.code === UNIQUE_VIOLATION_CODE) throw new ConflictLearnerException();

      throw new SaveLearnerException();
    }
  }

  async sendEmail(inviteEmailLearnerDto: InviteEmailLearnerDto) {
    const { email, spaceId } = inviteEmailLearnerDto;

    console.debug("InviteLearnerService ~ sendInvitationEmail ~ email:", email, "spaceId:", spaceId);

    const token = randomBytes(32).toString('base64url');
    const hash = createHash('sha256').update(token).digest('hex');
    const magicLink = `${process.env.APP_PUBLIC_URL}/learner/invitations/accept?token=${token}`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to register as a Learner in a Shira space',
        template: 'learner-invitation',
        data: {
          email: email,
          magicLink: magicLink
        }
      })

      await this.learnerRepo.update(
        { email, spaceId },
        { invitationToken: hash }
      );

    } catch (err) {
      console.error('InviteLearnerService ~ sendInvitationEmail ~ error sending learner invitation email', { email, spaceId, err });
      throw new EmailSendFailedException();
    }
  }

  async accept(token: string) {
    const learner = await this.learnerRepo.findOne({
      where: { invitationToken: token }
    });

    if (!learner) {
      console.error('InviteLearnerService ~ accept ~ invalid token for learner');
      throw new TokenConflictLearnerException();
    }

    try {
      await this.learnerRepo.update(
        { invitationToken: token },
        { registeredAt: new Date(), status: 'registered' }
      );
    } catch (err) {
      console.error('InviteLearnerService ~ accept ~ error saving accepted learner', { err });
      throw new SaveLearnerException();
    }
  }
}