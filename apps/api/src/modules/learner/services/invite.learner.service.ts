import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { EmailSendFailedException } from "../exceptions/email-send.learner.exception";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { createHash, randomBytes } from "crypto";
import { TokenConflictLearnerException } from "../exceptions/token-conflict.learner.exception";

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

    const token = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');

    let existing = await this.learnerRepo.findOne({ where: { spaceId, email } });
    if (existing) throw new ConflictLearnerException();

    try {
      const learner = this.learnerRepo.create({
        email,
        name,
        spaceId,
        status: 'invited',
        invitedAt: new Date(),
        invitationToken: tokenHash,
        assignedByUser: assignedByUser ? assignedByUser : null
      });

      await this.learnerRepo.save(learner);
      return { rawToken: token, email, spaceId };
    } catch (err) {
      if (err.code === UNIQUE_VIOLATION_CODE) throw new ConflictLearnerException();
      throw new SaveLearnerException();
    }
  }

  async sendEmail(email: string, spaceId: number, token: string) {
    console.debug("InviteLearnerService ~ sendEmail ~ email:", email, "spaceId:", spaceId);
    const magicLink = `${process.env.API_URL}/learners/invitations/${token}/accept`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to register as a Learner in a Shira space',
        template: 'learner-invitation',
        data: { email, magicLink }
      })
    } catch {
      throw new EmailSendFailedException();
    }
  }

  async accept(token: string) {
    const tokenHash = createHash("sha256").update(token).digest("hex");

    const learner = await this.learnerRepo.findOne({
      where: { invitationToken: tokenHash }
    });

    if (!learner) throw new TokenConflictLearnerException();

    try {
      await this.learnerRepo.update(
        { invitationToken: tokenHash },
        { status: 'registered', registeredAt: new Date() }
      );
    } catch {
      throw new SaveLearnerException();
    }
  }
}